import './helpers.service'
import './notification.service'
import './feathers.service'
import './api.service'

const auth = {
  currentUser: undefined,

  login: async user => {
    var [err, foundUser] = await to(feathers.authenticate(user))

    if(!err) {
      foundUser = foundUser.data
      notify.success(`Hello ${foundUser.name || foundUser.email}`)
      return auth.currentUser = foundUser
    } else {
      notify.warning(err.message)
      console.error('Error authenticating', err.message)
      auth.logout()
      return false
    }
  },

  logout: async user => {
    feathers.logout()
    auth.currentUser = undefined
  },

  signup: async user => {
    if(!user) {
      notify.error('Please fill out the user information')
      return false
    }

    let [err, result] = await api.users.create(user)

    if(!err) {
      let options = {
        type: 'local',
        email: user.email,
        password: user.password
      }

      let [authFail, currentUser] = await to(feathers.authenticate(user))

      currentUser = currentUser.data

      if(!authFail) {
        notify.success(`Hello ${currentUser.name || currentUser.email}. Please check your email and verify so we can protect your account.`)
        return auth.currentUser = currentUser
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

  changeIdentity: async function(user, password, changes) {
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
      console.log("Verify Email Error: ", err);
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
      console.log("Verify Changes Error: ", err);
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
      console.log('Error sending reset password email', err)
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
    return feathers.authenticate().then(response => {
      auth.currentUser = feathers.get('user')
      return auth.currentUser
    }, err => {
      console.log("Currently not logged in");
    });
  },

  hasPermission: permissionName => {

    let privs = _.get(auth, 'currentUser.permissions')

    if(!privs) {
      return this.isLoggedIn().then(isLoggedIn => {
        if(!isLoggedIn) { return false }

          auth.currentUser = feathers.get('user');

          let privs = _.get(auth, 'currentUser.permissions')

          if(!privs || (!privs.includes(permissionName) && !privs.includes('allPrivilages'))) {
            return false
          } else {
            return true
          }
      }, err => {
        return false
      })
    } else {
      if(privs.includes(permissionName) || privs.includes('allPrivilages')) {
        return true
      } else {
        return false
      }
    }
  },

  hasPermissionSync: permissionName => {

    let privs = _.get(auth, 'currentUser.permissions')

    if(
        !privs || (!privs.includes(permissionName) && !privs.includes('allPrivilages'))
    ) {
      return false
    }

    return true
  }

}

try {
  global.auth = auth
} catch(err) {}

export default auth
