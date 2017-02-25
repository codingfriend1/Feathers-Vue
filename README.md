# Feathers-Vue

> A Vue and FeathersJS fullstack app with authentication, email verification, and email support.&#34;

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
  - Jasmine with Karma for client side and mocha server side
  - Bootstrap
  - Lodash
  - jQuery
  - FontAwesome
  - Separate admin and app

## Getting Started

Getting up and running is as easy as 1, 2, 3, 4.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/Feathers-Vue; npm install
    ```
3. Run your build or watch

    ```
      npm run build
    ```

    ```
      npm run watch
    ```

4. Start your app locally

    ```
    mongod
    ```

    ```
    npm run serve
    ```

In production run

    ```
      npm run production
      npm start
    ```

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

## Schemas go in shared/schemas
If you want the same schema to validate both client and server side put the schema in ./shared/schemas as it's own file with the file name being the name of the schema and resulting model.

You can use `pattern` and `patternMessage` directly in the schema and it will be converted to
```
validate: {
  validator: function(v) {
    return pattern.test(v)
  },
  message: patternMessage
}
```
for you.

## Docker-compose
You may run
```
docker-compose up
```
to build a docker-virtual machine instance.

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
