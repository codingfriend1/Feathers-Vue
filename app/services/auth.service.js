/**
 * Dream Code Auth Service
 * 
 * Client-Side Authentication and Authorization Service
 * 
 * Creates a global `auth` constant
 * Methods
 * 
 * - __authenticate({ email, password }) - internal method
 * 
 * - login({ email, password })
 * 
 * - logout()
 * 
 * - signup({ email, name, password })
 * 
 * - changePassword({ oldPassword, newPassword })
 * 
 * - changeMyIdentity( password, { email, name }) - Must be logged in
 * 
 * - verifySignUp( verifyToken )
 * 
 * - verifyChanges( verifyToken )
 * 
 * - resendVerification( email )
 * 
 * - sendResetPassword( email )
 * 
 * - resetPassword( email )
 * 
 * - getToken()
 * 
 * - isLoggedIn()
 * 
 * - hasPermission( permissionName ) - 
 *     Checks user permissions against a single permission string 
 *     but waits for login request to finish
 *      
 * - hasPermissionSync( permissionName )
 * 
 * Properties
 * - currentUser - Containers the current user definition
 */

const auth = {
  currentUser: null,
  __authenticate: user => {

    user = user ? Object.assign(user, { strategy: 'local' }): undefined

    return feathers.authenticate( user )
    .then(response => {

      if(window.location.hostname.indexOf('localhost') > -1) {
        notify.log('Access Token: ', response.accessToken)
        notify.log('User: ', response.user)
      }

      feathers.set('user', response.user)
      auth.currentUser = feathers.get('user')
      return auth.currentUser

      // return feathers.passport.verifyJWT(response.accessToken)
    })

  },

  login: async user => {

    auth.logout()

    var [err, foundUser] = await to( auth.__authenticate(user) )

    if(!err) {
      notify.success(`Hello ${foundUser.name || foundUser.email}`)
      return auth.currentUser
    } else {
      notify.warning(err.message)
      notify.debug('Error authenticating', err)
      auth.logout()
      return false
    }
  },

  logout: async user => {
    feathers.logout()
    feathers.set('user', null)
    auth.currentUser = null
  },

  signup: async user => {
    if(!user) {
      notify.error('Please fill out the user information')
      return false
    }

    auth.logout()

    let [err, result] = await api.users.create(user)

    if(!err) {
      let options = {
        type: 'local',
        email: user.email,
        password: user.password
      }

      let [authFail, currentUser] = await to( auth.__authenticate(user) )

      if(!authFail) {
        notify.success(`Hello ${currentUser.name || currentUser.email}. Please check your email and verify so we can protect your account.`)
        return auth.currentUser
      } else {
        notify.error(parseErrors(authFail), 'Error signing up')
        return false
      }
    } else {
      if(err.code === 409) {
        notify.error('That email is already taken.')
      } else {
        notify.error(parseErrors(err))
      }
      return false
    }
  },

  changePassword: async function(oldPassword, password) {
    if(!_.get(auth, 'currentUser.email')) {
      notify.warning('You must be logged in to change your password.')
      return false
    }

    let options = {
      action: 'passwordChange',
      value: {
        user: {
          email: auth.currentUser.email
        },
        oldPassword,
        password
      }
    }

    let [err, result] = await api.authManagement.create(options)

    if(!err) {
      notify.success('Your current password has been changed. Next time you log in please use the new password.')
    } else {
      notify.error(err.message)
    }
  },

  changeMyIdentity: async function(password, changes) {
    if(!_.get(auth, 'currentUser.email')) {
      notify.warning('You must be logged in to update your account.')
      return false
    }

    if(!password) {
      notify.warning('You must provide a password to update your account.')
      return false
    }

    if(!changes) {
      notify.warning('Please provide information to update your account with.')
      return false
    }

    let options = {
      action: 'identityChange',
      value: {
        password,
        changes,
        user: {
          email: auth.currentUser.email
        }
      }
    }

    let [err, result] = await api.authManagement.create(options)

    if(!err) {
      notify.success('The changes are pending. Please check your email to verify that you made the change.')
    } else {
      notify.error(err.message)
    }
  },

  verifySignUp: async function verifySignUp(slug) {
    if(!slug) { return false }
    let [err, response] = await api.authManagement.create({
      action: 'verifySignupLong',
      value: slug
    })

    if(!err) {
      notify.success('Your email has been verified. We can now protect your account.')
    } else {
      notify.error('Sorry, but we could not verify your email.')
      notify.debug("Verify Email Error: ", err)
    }

    return response
  },

  verifyChanges: async function verifyChanges(slug) {
    if(!slug) { return false }
    let [err, response] = await api.authManagement.create({
      action: 'verifySignupLong',
      value: slug
    })

    if(!err) {
      notify.success('You have approved the changes to your account. You may now sign in under the new email.')
    } else {
      notify.error('Sorry, but we could not approved the changes to your account.')
      notify.debug("Verify Changes Error: ", err)
    }
  },

  resendVerification: async function resendVerification(email) {
    if(_.get(auth, 'currentUser.isVerified')) {
      return notify.success("This account has already been verified")
    }
    if(!email) {
      notify.success('Please fill out your email to verify.')
      return false
    }

    let options = {
      action: 'resendVerifySignup',
      value: { email }
    }

    let [err, result] = await api.authManagement.create(options)

    if(!err) {
      notify.success('Another verification email has been sent.')
    } else {
      notify.error('Sorry but we could not send a verification email.')
    }
  },

  sendResetPassword: async function sendResetPassword(email) {
    if(!email) {
      notify.warning('Please provide your email so we can send you a reset password email.')
      return false
    }

    let options = {
      action: 'sendResetPwd',
      value: { email }
    }

    let [err, result] = await api.authManagement.create(options)

    if(!err) {
      notify.success('Please check your email. A link to reset your password has been sent.')
    } else {
      notify.warning(err.message)
      notify.debug('Error sending reset password email', err)
    }
  },

  resetPassword: async function saveResetPassword(slug, password) {

    let options = {
      action: 'resetPwdLong',
      value: { token: slug, password }
    }

    let [err, result] = await api.authManagement.create(options)

    if(!err) {
      notify.success('Your password was updated. You may now sign in under the new password.')
      return true
    } else {
      notify.warning('Sorry but there was an error updating your password.')
    }

  },

  getToken: () => feathers.get('token'),

  isLoggedIn: () => {
    return auth.__authenticate().then(response => {
      auth.currentUser = feathers.get('user')
      return auth.currentUser
    }, err => {
      notify.debug("Currently not logged in")
    })
  },

  hasPermission: permissionName => {

    let privs = _.get(auth, 'currentUser.permissions')

    if(!privs) {
      return this.isLoggedIn().then(isLoggedIn => {
        if(!isLoggedIn) { return false }

          auth.currentUser = feathers.get('user')

          let privs = _.get(auth, 'currentUser.permissions')

          return !privs || (!privs.includes(permissionName) && _.get(auth, 'currentUser.role') !== 'admin')

      }, err => {
        return false
      })
    } else {
      if(privs.includes(permissionName) || _.get(auth, 'currentUser.role') === 'admin') {
        return true
      } else {
        return false
      }
    }
  },

  hasPermissionSync: permissionName => {

    let privs = _.get(auth, 'currentUser.permissions')

    return !privs || (!privs.includes(permissionName) && _.get(auth, 'currentUser.role') !== 'admin')
  }

}

try {
  global.auth = auth
} catch(err) {}

module.exports = auth
