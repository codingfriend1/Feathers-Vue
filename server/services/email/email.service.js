// Initializes the `email` service on path `/email`
const hooks = require('./email.hooks');
const Mailer = require('feathers-mailer');
const smtpTransport = require('nodemailer-smtp-transport');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  // Initialize our service with any options it requires
  app.use('/emails', Mailer(smtpTransport({
    service: 'gmail',
    auth: {
      user: app.get('GMAIL'),
      pass: app.get('GMAIL_PASSWORD')
    }
  })));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('emails');

  service.hooks(hooks);
};
