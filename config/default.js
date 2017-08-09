module.exports = {
  "host": "localhost",
  "port": 3030,
  "protocal": "http",
  "public": "../public/",
  "src": "../server/",
  "GMAIL": process.env.GMAIL,
  "GMAIL_PASSWORD": process.env.GMAIL_PASSWORD,
  "paginate": {
    "default": 10,
    "max": 50
  },
  "mongodb": process.env.DATABASE_URL || "mongodb://localhost:27017/FeathersVue",
  "authentication": {
    "secret": "01f2b6eeccc0150f5982c91627a68a47fc3850d9d0869733721b90fa4c83329b7260c3617a5e79b69b5b55dfcc61cb3173c0211c867e285e3a82ad2178a5cb1382079cbbcd85e426554a715d32884b0043a016cfb0b6e58ed5d6bea3a867bc6ce803a7ff6dfa38a3f90574c94334877117b178d7681e57b0a42a384b23210ba56ca4eb103ea3556894c8e00e17eb1e314e672033cf40e0c30c0d5724776919222e752ca8537944a4416bfe199e72288f21515abe0096feae92b3ccf5722bf208d482032f749ac624b887d93536dbbfe142be27cc82ca22b87983d2347425d9d69064f96036b791d9a38b3f85082026f60f0b83573ee3b5494119462f3f2dfaf7",
    "strategies": [
      "jwt",
      "local"
    ],
    "path": "/authentication",
    "service": "users",
    "jwt": {
      "header": {
        "type": "access"
      },
      "audience": "https://yourdomain.com",
      "subject": "anonymous",
      "issuer": "feathers",
      "algorithm": "HS256",
      "expiresIn": "1d"
    },
    "local": {
      "entity": "user",
      "service": "users",
      "usernameField": "email",
      "passwordField": "password"
    },
    "google": {
      "clientID": "your google client id",
      "clientSecret": "your google client secret",
      "successRedirect": "/",
      "scope": [
        "profile openid email"
      ]
    },
    "facebook": {
      "clientID": "your facebook client id",
      "clientSecret": "your facebook client secret",
      "successRedirect": "/",
      "scope": [
        "public_profile",
        "email"
      ],
      "profileFields": [
        "id",
        "displayName",
        "first_name",
        "last_name",
        "email",
        "gender",
        "profileUrl",
        "birthday",
        "picture",
        "permissions"
      ]
    },
    "github": {
      "clientID": "your github client id",
      "clientSecret": "your github client secret",
      "successRedirect": "/"
    },
    "cookie": {
      "enabled": true,
      "name": "feathers-jwt",
      "httpOnly": false,
      "secure": false
    }
  }
}
