'use strict';

global.to = function(promise) {
  return promise.then(result => [null, result]).catch(err => [err, null])
}

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');
const url = require('url');
const routes = require('./routes');
const seed = require('./seed');

const api = feathers();

api.configure(configuration(path.join(__dirname, '..')));

api.use(compress())
  .options('*', cors())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  .configure(socketio())
  .use(function attachUrl(req, res, next) {
    var path = url.format({
      protocol: req.protocol,
      hostname: req.hostname
    })
    if(app.get('port')) {
      path = path + app.get('port') === '80'? '': ':' + app.get('port')
    }
    req.feathers.serverUrl = path
    next()
  })
  .configure(services)
  .configure(seed)
  .configure(middleware);

const app = feathers()
  .configure(configuration(path.join(__dirname, '..')))
  .use('/api', api)
  .use(favicon( path.join(api.get('public'), 'favicon.ico') ))
  .configure(routes)

app.set('view engine', 'jade');

module.exports = app;
