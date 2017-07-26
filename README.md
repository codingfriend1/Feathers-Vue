# Feathers-Vue

> A Vue 2 and FeathersJS 2 fullstack app with authentication, email verification, and email support.&#34;

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications and Vue 2 with Server Side Rendering.

This project is not finished but if you are can be ready to use if you are content with what it offers.

Features
  - SASS
  - Stylus
  - Jade
  - ES6, ES7, and ES8
  - Webpack
  - Vue Stash - For Redux Store
  - Bootstrap
  - Lodash
  - jQuery
  - FontAwesome
  - Validate client side data with mongoose schemas

## Getting Started

Getting up and running is as easy as 1, 2, 3, 4.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/Feathers-Vue; npm install
    ```
3. Start your app locally

    ```
    mongod
    ```

    ```
    npm run dev
    ```

In production run

    
      npm run build
      npm start


    

If you want emails to work using gmail add the following environment variables
  ```
  export GMAIL=yourgmailaccount@gmail.com
  export GMAIL_PASS=yourpassword or app-password
  ```
_See [How to set an app password](https://support.google.com/accounts/answer/185833)_
## Testing

Simply run `npm test` and all your tests in the `test/` directory to run server side unit test or run  `npm test-client` to run client side tests.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g feathers-cli             # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Docker-compose
Create an environments file, `environment.env` in the project root that you can store production environment variables in. These will contain things like your app secret, gmail, app password, and such. Don't include this file in your repo as you may expose sensitive information.

You may run
```
docker-compose up
```
to build a docker-virtual machine instance.

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Looking for mobile?
I'm working on a cordova starter with feathers 2, Vue 2, and Framework 7. Visit the `cordova` branch of this repo.

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
