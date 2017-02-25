import { to } from './helpers.service'
import feathers from './feathers.service'
import _ from 'lodash'

/**
 * @overview 	A sevice that sends get, post, put, and delete requests to the server through http. Allows raw mongoDB queries to be passed to the server. The user creates a new instance of the endpoints service providing an endpoint url to reach and calls api methods on that instance.
 * @author Jon Paul Miles <milesjonpaul@gmail.com>
 * @version 1.0.0
 * @license MIT
 * @example `var menus = new endpoints('menus');
 * var replaceMenu = {
 * 	url: '/new-url',
 * 	classes: 'another-class',
 * 	target:'_self'
 * };
 * //Pass in raw mongoDB queries
 * menus.update({url: '/about'}, replaceMenu).then(cb);`
 */

	/**
	 * Sets up a rest endpoint for the given url so create, find, update, and delete can be performed on it.
	 * @constructor
	 * @param  {string} endpoint The URL of the server endpoint to reach. `/api/` prefix is already assumed.
	 * @return {nothing}
	 */
	function endpoints(endpoint = '') {
    this.endpoint = endpoint

		if(endpoint.indexOf('http://') > -1 || endpoint.indexOf('https://') > -1) {
			this.url = endpoint; // If the url is a full address then don't modify it
		} else { // else prefix it with /api/ so it calls our server api
			this.url = '/api/' + this.endpoint;
      // this.url = domain + endpoint
		}
	}

	/**
	 * Adds content in the server database for the endpoint passed into the constructor function.
	 * @param  {object} content The item(s) to be added to the database
	 * @return {promise} An array of items that were created
	 */
	endpoints.prototype.create = function(content) {
    return to( feathers.service(this.url).create( _.clone(content, true) ) )
	};

	/**
	 * Gets data matching the query.
	 * @param  {object} query Raw mongoDB query
	 * @return {promise} An array of items matching the query
	 */
	endpoints.prototype.find = function(query) {
    return to(feathers.service(this.url).find({ query }))
	};

	/**
	 * Updates data in the server database identified with a mongoDB query with the replacement data passed in.
	 * @param  {object} query Raw mongoDB query
	 * @param  {object} replacement Whatever data you want to replace the found data with, only replaces properties mentioned, not the whole object
	 * @return {promise} Items that were updated
	 */
	endpoints.prototype.update = function(query, replacement) {
    var rp = _.clone(replacement, true);
    rp.createdAt = undefined;
    rp.updatedAt = undefined;

    return to(feathers.service(this.url).patch(null, rp, { query }))
	};

  /**
   * Updates or creates an item depending on if it has an id or not
   * @param {object} item The item to be upserted
   * @return {object} The upserted object from the server
   */
	endpoints.prototype.upsert = function(item) {
    var rp = _.clone(item, true);
    rp.createdAt = undefined;
    rp.updatedAt = undefined;

    if(rp._id) {
      return to( feathers.service(this.url).patch(rp._id, rp) )
    } else {
      return to( feathers.service(this.url).create( rp, true) )
    }
	};

	/**
	 * Deletes data from the server database that matches the mongoDB query passed in.
	 * @param  {object} query Raw mongoDB query
	 * @return {promise} The item(s) deleted
	 */
	endpoints.prototype.delete = function(query) {
    let id = null;
    let params = { query };
    if(query._id) { id = query._id; query = undefined; }

    return to(feathers.service(this.url).remove(id, params))
	};

	/**
	 * Returns one item from the server that has the mongoDB _id passed in.
	 * @param  {string} id The _id value of the object to retrieve
	 * @return {promise} Object that has that id
	 */
	endpoints.prototype.findOne = function(id) {
    return to(feathers.service(this.url).get(id))
	};

	/**
	 * Updates one item in the database that has the _id passed in with the information in replacement.
	 * @param  {string} id The `_id` of the mongoDB object
	 * @param  {object} replacement The content to replace the found object with
	 * @return {promise} Item replaced
	 */
	endpoints.prototype.updateOne = function(id, replacement) {
    var rp = _.clone(replacement, true);
    rp.createdAt = undefined;
    rp.updatedAt = undefined;

    return to(feathers.service(this.url).patch(id, rp))
	}

	/**
	 * Deletes one item from the server database that has the _id that was passed in.
	 * @param  {string} id The _id of the mongoDB object to delete
	 * @return {promise} Item deleted
	 */
	endpoints.prototype.deleteOne = function(id)  {
    return to(feathers.service(this.url).remove(id))
	}

export default endpoints
