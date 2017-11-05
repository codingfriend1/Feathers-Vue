# Feathers-Vue

> A Vue 2 and FeathersJS 2 fullstack app with authentication, email verification, and email support.&#34;

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications and Vue 2 with Server Side Rendering.

This project is not finished but if you are can be ready to use if you are content with what it offers.

Features
  - SASS
  - Stylus
  - Pug
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

There are multiple ways to start/develop the app.

### Develop with docker
Don't install node_modules locally

1. Create a `environment-dev.env` and `environment.env` file to hold your environment variables. These files are ignored by git. You'll want a DATABASE_URL and you gmail info for email verification

  ```
  DATABASE_URL=mongodb://db/feathersvuedevelopment
  COMPLAINT_EMAIL=your_email@gmail.com
  GMAIL=your_email@gmail.com
  GMAIL_PASSWORD=your_pass_password
  ```

  _See [How to set an app password](https://support.google.com/accounts/answer/185833)_

2. Run npm start

  ```
  npm start
  ```
2. To see production build locally
  
  ```
  npm run build-qa
  npm run qa
  ```

3. To switch back to development use 

  ```
  npm run build-dev
  npm start
  ```

Switching contexts between production and development requires a full docker build with no cache.


### Develop without docker

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

4. In production run

    ```
    npm run build
    npm run production
    ```
    

If you want emails to work using gmail add the following environment variables
  ```
  export GMAIL=yourgmailaccount@gmail.com
  export GMAIL_PASS=yourpassword or app-password
  ```
_See [How to set an app password](https://support.google.com/accounts/answer/185833)_

## Testing

Simply run `npm test` and all your tests in the `test/` directory to run server side unit test or run  `npm run integration` to run client side side tests.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g feathers-cli             # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

## Looking for mobile?
I'm working on a cordova starter with feathers 2, Vue 2, and Framework 7. Visit the `cordova` branch of this repo.

[Cordova Branch](https://github.com/codingfriend1/Feathers-Vue/tree/cordova)

## Gitlab Auto Deployment
1. Create a digitalocean instance from using the one-click docker instance.
2. ssh into the instance and run
  ```
    sudo apt-get update
    sudo apt-get upgrade
    sudo apt-get -y install python-pip
    sudo pip install docker-compose
  ```
3. Edit `sshd_config`

  ```
    nano /etc/ssh/sshd_config
  ```

4. At the bottom of the file change `PasswordAuthentication` 

  ```
    PasswordAuthentication yes
  ```
5. Run `reload ssh`
6. Set the secret environment variables in gitlab
  
  ```
    DATABASE_URL=mongodb://db/feathersvue
    DEPLOYMENT_SERVER_IP=your_ip_address
    DEPLOYMENT_SERVER_PASS=your_user_password
    DEPLOYMENT_SERVER_USER=your_server_user
  ```
7. Update `docker-compose.autodeploy.yml` web image to point to your hosted image.
8. Update `gitlab-ci.yml` in the `only` sections to only run on the branches you want to deploy from.
9. Push changes in git to gitlab.

## Breaking Changes

  - Removed mongoose validation from client side and replaced with Yup.
  - Reconstructed server-side rendering to use updated instructions in vuejs.
  - Moved server-entry file into app.

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
