const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const sync = require('feathers-sync');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');

const mongodb = require('./mongodb');

const authentication = require('./authentication');

const ssr = require('./ssr');
const seed = require('./seed');


const api = feathers();

// Load app configuration
api.configure(configuration(path.join(__dirname, '..')));
// Enable CORS, security, compression, favicon and body parsing
api.use(cors());
api.use(helmet());
api.use(compress());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

// Set up Plugins and providers
api.configure(hooks());
api.configure(mongodb);
api.configure(rest());
api.configure(socketio());

console.log(`api.get('mongodb')`, api.get('mongodb'))

api.configure(sync({
  db: api.get('mongodb'),
  collection: 'syncEvents'
}));

api.configure(authentication);

// Set up our services (see `services/index.js`)
api.configure(services);
api.configure(seed);
// Configure middleware (see `middleware/index.js`) - always has to be last
api.configure(middleware);
api.hooks(appHooks);

const app = feathers()
  .configure(configuration(path.join(__dirname, '..')))
  .use('/api', api)
  .use(favicon(path.join(api.get('public'), 'favicon.ico')))
  // Host the public folder
  .use('/public', feathers.static(api.get('public')))
  .configure(ssr)

app.set('view engine', 'pug');

module.exports = { app, api };
