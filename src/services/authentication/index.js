'use strict';

const authentication = require('feathers-authentication');
const hooks = require('./hooks');

const BitbucketStrategy = require('passport-bitbucket-oauth2').Strategy;
const DropboxStrategy = require('passport-dropbox-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const GithubStrategy = require('passport-github').Strategy;
const GithubTokenStrategy = require('passport-github-token');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const InstagramStrategy = require('passport-instagram').Strategy;
const InstagramTokenStrategy = require('passport-instagram-token');
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const LinkedinTokenStrategy = require('passport-linkedin-token-oauth2').Strategy;
const PaypalStrategy = require('passport-paypal-oauth').Strategy;
const PaypalTokenStrategy = require('passport-paypal-token');
const SpotifyStrategy = require('passport-spotify').Strategy;

module.exports = function() {
  const app = this;

  let config = app.get('auth');

  config.bitbucket.strategy = BitbucketStrategy;
  config.dropbox.strategy = DropboxStrategy;
  config.facebook.strategy = FacebookStrategy;
  config.facebook.tokenStrategy = FacebookTokenStrategy;
  config.github.strategy = GithubStrategy;
  config.github.tokenStrategy = GithubTokenStrategy;
  config.google.strategy = GoogleStrategy;
  config.google.tokenStrategy = GoogleTokenStrategy;
  config.instagram.strategy = InstagramStrategy;
  config.instagram.tokenStrategy = InstagramTokenStrategy;
  config.linkedin.strategy = LinkedinStrategy;
  config.linkedin.tokenStrategy = LinkedinTokenStrategy;
  config.paypal.strategy = PaypalStrategy;
  config.paypal.tokenStrategy = PaypalTokenStrategy;
  config.spotify.strategy = SpotifyStrategy;

  app.set('auth', config);
  app.configure(authentication(config));

  const authService = app.service('/auth/local');

  // Set up our before hooks
  authService.before(hooks.before);
};
