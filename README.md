# Feathers-Vue

> A Vue 2, Cordova, and FeathersJS 2 app with authentication, email verification, and email support.&#34;

## About

My favorite frameworks are Vue and Feathersjs. As for mobile frameworks, framework 7 may be one of the best frameworks out there. This boilerplate provides a starter place for high-quality apps for both desktop and mobile with an organized structure and several commonly used services and helpers in large apps pre-included. If you find other generic helpers that you find yourself using in many apps feel free to send a pull request.

__NOTE:__ This project is not finished yet but is worth using.

Features
  - Cordova
  - Framework 7
  - Validate client side data with mongoose schemas
  - Vue Stash - For Redux Store
  - FontAwesome
  - Material Icons
  - SASS
  - Stylus
  - Jade
  - ES6, ES7, and ES8
  - Webpack
  - Lodash

## Getting Started

#### Development

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/Feathers-Vue; npm install
    ```

3. Setup your development server api. This could be hosted or just existing locally. If local, get your local environment's ip number so your mobile device can connect to web sockets. [Guide to get your ip](http://www.wikihow.com/Find-Your-IP-Address-on-a-Mac)
    
    ```
      ifconfig | grep "inet " | grep -v 127.0.0.1
    ```

    or for windows:

    ```
    ipconfig
    ```

4. Write your address in the `app/services/api/feathers.service.js`.

5. Start your app locally


    ```
    mongod
    ```

    ```
    npm run dev
    ```

6. Visit `localhost:3030`

#### Production

1. For production server run or use docker-compose

    ```
      npm run build
      npm start
    ```

    or

    ```
    docker-compose up
    ```
2. Build your app

    ```
      cordova build --release android ios browser
    ```
3. Deploy your .apk file from `platforms/android/build/outputs/apk/android-debug.apk`

#### Mobile Testing

1. For android testing, run

    ```
    cordova build android
    ```

2. Send the .apk file from `platforms/android/build/outputs/apk/android-debug.apk` to your phone and install it.

3. Make sure the development server is running on your laptop under the correct ip name or hosting.

## Email Verification

If you want emails to work using gmail add the following environment variables
  ```
  export GMAIL=yourgmailaccount@gmail.com
  export GMAIL_PASS=yourpassword or app-password
  ```
_See [How to set an app password](https://support.google.com/accounts/answer/185833)_

## Testing

Simply run `npm test` and all your tests in the `test/` directory to run server side unit tests.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g feathers-cli             # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```



__NOTE:__ I structure schemas differently than the feathers defaults, this allows you to use the same schema in different contexts such as client-side validation. When you add a feathers service move the schema into the `server/schemas/` folder following the examples.

## Docker-compose
Create an environments file, `environment.env` in the project root that you can store production environment variables in. These will contain things like your app secret, gmail, app password, and such. Don't include this file in your repo as you may expose sensitive information.

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
