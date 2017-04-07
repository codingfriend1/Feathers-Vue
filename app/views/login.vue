<template lang="jade">
.login-form-container
	header.login-form-header
		.login-form-title {{accountTitle}}
		.login-form-add-account-button(@click="toggleLogin()", v-show="showing === 'login'")
			i.fa.fa-plus
		.login-form-back-button(@click="toggleLogin()" v-show="showing === 'signup'")
			i.fa.fa-times
	.login-form-body
		.login-form(v-show="showing === 'login'")
			.login-form-group
				.login-form-email-icon.login-form-icon
					i.fa.fa-envelope
				input.login-form-email-input.login-form-input(type='email', placeholder='email' v-model="user.email")
			.login-form-group
				.login-form-password-icon.login-form-icon
					i.fa.fa-lock
				input.login-form-password-input.login-form-input(type='password', placeholder='password' v-model="user.password")
			.login-form-warning-text
			.login-form-social-logins
				.login-form-third-column
					a(href="/api/auth/facebook")
						.login-form-social-login-icon.login-form-facebook-icon
							i.fa.fa-facebook
				.login-form-third-column
					a(href="/api/auth/google")
						.login-form-social-login-icon.login-form-google-icon
							i.fa.fa-google
				.login-form-third-column
					a(href="/api/auth/twitter")
						.login-form-social-login-icon.login-form-twitter-icon
							i.fa.fa-twitter
			.login-form-login-button(@click="login(user)") Login
			.login-form-forgot-password(@click="auth.sendResetPassword(user.email)") Forgot your password?
		.signup-form(v-show="showing === 'signup'")
			.login-form-group
				.login-form-name-icon.login-form-icon
					i.fa.fa-user
				input.login-form-name-input.login-form-input(type='text', placeholder='name' v-model="user.name")
			.login-form-group
				.login-form-email-icon.login-form-icon
					i.fa.fa-envelope
				input.login-form-email-input.login-form-input(type='email', placeholder='email' v-model="user.email")
			.login-form-group
				.login-form-password-icon.login-form-icon
					i.fa.fa-lock
				input.login-form-password-input.login-form-input(type='password', placeholder='password' v-model="user.password")
			.login-form-warning-text
			.login-form-social-logins
				.login-form-third-column
					.login-form-social-login-icon.login-form-facebook-icon
						i.fa.fa-facebook
				.login-form-third-column
					.login-form-social-login-icon.login-form-google-icon
						i.fa.fa-google
				.login-form-third-column
					.login-form-social-login-icon.login-form-twitter-icon
						i.fa.fa-twitter
			.alert.alert-danger(v-show="errorsSummary" v-html="errorsSummary")
			.login-form-login-button(@click="signup(user)") Sign Up
			.login-form-forgot-password(@click="auth.resendVerification(user.email)") Resend Verification Email
		.change-password-form(v-show="showing === 'changePassword' && currentUser")
			.login-form-group
				.login-form-password-icon.login-form-icon
					i.fa.fa-lock
				input.login-form-password-input.login-form-input(type='password', placeholder='old password' v-model="user.password")
			.login-form-group
				.login-form-password-icon.login-form-icon
					i.fa.fa-lock
				input.login-form-password-input.login-form-input(type='password', placeholder='new password' v-model="user.newPassword")
			.login-form-warning-text
			.login-form-change-password-btn(@click="auth.changePassword(user.password, user.newPassword)") Change Password
		.reset-password-form(v-show="showing === 'reset'")
			.login-form-group
				.login-form-password-icon.login-form-icon
					i.fa.fa-lock
				input.login-form-password-input.login-form-input(type='password', placeholder='new password' v-model="user.password")
			.login-form-warning-text
			.login-form-change-password-btn(@click="resetPassword(user.password)") Reset Password
		.change-email-form(v-show="showing === 'changeEmail' && currentUser")
			.login-form-group
				.login-form-email-icon.login-form-icon
					i.fa.fa-envelope
				input.login-form-email-input.login-form-input(type='email', placeholder='new email' v-model="user.newEmail")
			.login-form-group
				.login-form-password-icon.login-form-icon
					i.fa.fa-lock
				input.login-form-password-input.login-form-input(type='password', placeholder='current password' v-model="user.password")
			.login-form-warning-text
			.login-form-change-email-btn(@click="auth.changeIdentity(user, user.password, {email: user.newEmail})") Update Email
</template>

<script>
	module.exports =  {
		store: ['currentUser'],
		data: () => ({
			showing: 'login',
			accountTitle: 'Login',
			auth: {},
			errorsSummary: '',
			user: {
				email: '',
				name: '',
				password: '',
				newPassword: '',
				newEmail: null,
				type: 'local'
			},
		}),
		methods: {
			login: async function(user) {
				let [err, result] = await to(auth.login(user))
				if(!err) { this.$router.push('/') }
			},
			signup: async function(user) {
				user.role = 'willBeReplaced'
				let valid = await checkValid(user, 'user')

				if(valid) {
					this.errorsSummary = ''
					let [err, result] = await to(auth.signup(user))
					if(!err) { this.$router.push('/') }
				} else {
					this.errorsSummary = _.map(user.errors, err => err).join('<br>')
				}

			},
			toggleLogin: function() {
				if(this.showing === 'login') {
					this.showing = 'signup'
					this.accountTitle = 'Sign Up'
				} else {
					this.showing = 'login'
					this.accountTitle = 'Login'
				}
			},
			resetPassword: function(password) {
				auth.resetPassword(this.$route.params.slug, password).then(response => {
					this.showing = 'login'
					this.accountTitle = 'Login'
					this.user.password = ''
				})
			}
		},
		mounted: function() {
			this.auth = auth

			switch (this.$route.params.type) {

				case 'verify':
					auth.verifySignUp(this.$route.params.slug)
					break;
				case 'verifyChanges':
					auth.verifyChanges(this.$route.params.slug)
					break;
				case 'reset':
					this.accountTitle = 'Reset Password'
					this.showing = 'reset'
					break;
				case 'changePassword':
					if(this.$store.currentUser) {
						this.accountTitle = 'Change Password'
						this.showing = 'changePassword'
					}

					break;
				case 'changeEmail':
					if(this.$store.currentUser) {
						this.accountTitle = 'Change Email'
						this.showing = 'changeEmail'
					}
					break;
				default:
					break;
			}
		},
		metaInfo: {
			title: 'Login',
		}
	}
</script>


<style lang="stylus">
	.login-form-container {
		max-width: 350px;
		margin-right: auto;
		margin-left: auto;
		box-shadow: 5px 5px 17px -8px rgba(0,0,0,0.66);
		font-family: sans-serif;
		border-radius: 3px;
	}

	.login-form-header {
		position: relative;
		padding: 1em;
		border-bottom: 1px solid black;
		border-top-right-radius: 3px;
		border-top-left-radius: 3px;
		background-color: #34495e;
		z-index: 3;
	}

	.login-form-title {
		color: #EBEBEB;
		font-size: 1.5em;
	}

	.login-form-add-account-button {
		position: absolute;
		top: 100%;
		right: 10%;
		background-color: #3498db;
		transform: translateY(-50%);
		border-radius: 10em;
		width: 3.5em;
		height: 3.5em;
		color: #EBEBEB;
		box-shadow: 5px 5px 17px -8px rgba(0,0,0,0.66);
		z-index: 3em;
	}

	.login-form-back-button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 0%;
		font-size: 2em;
		color: #EBEBEB;
		padding: 1em;
		cursor: pointer;
	}

	.login-form-body {
		padding: 1em;
	}

	.login-form-group {
		position: relative;
	}

	.login-form-input {
		border: none;
		outline: none;
		border-bottom: 1px solid #EBEBEB;
		padding: 0.5em;
		width: 100%;
		margin-top: 0.5em;
		margin-bottom: 0.5em;
		box-sizing: border-box;
		padding-left: 2em;
		font-size: 1.1em;
	}

	.login-form-icon {
		position: absolute;
		left: 0.5em;
		top: 50%;
		font-size: 1.2em;
		color: #3498db;
		transform: translateY(-50%);
	}

	.login-form-warning-text {
		color: grey;
		text-align: center;
		margin-top: 0.5em;
		padding: 0 0.5em;
	}

	.login-form-third-column {
		border-radius: 10em;
		display: inline-block;
		width: 33.33%;
		margin-right: -0.25em;
		position: relative;
	}

	.login-form-social-logins {
		margin-top: 1.5em;
		margin-bottom: 1.5em;
	}

	.login-form-social-login-icon {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translateX(-50%);
		color: #EBEBEB;
		border-radius: 10em;
		font-size: 1.5em;
		width: 2.2em;
		height: 2.2em;
		box-sizing: border-box;
		cursor: pointer;
	}

	.login-form-social-login-icon i,
	.login-form-add-account-button i {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.login-form-google-icon {
		background-color: #DE4B39;
	}

	.login-form-facebook-icon {
		background-color: #3A569B;
	}

	.login-form-twitter-icon {
		background-color: #50ABF1;
	}

	.login-form-login-button,
	.login-form-change-email-btn,
	.login-form-change-password-btn,
	.login-form-reset-password-btn {
		background-color: #3498db;
		color: #EBEBEB;
		padding: 1em;
		margin: 0.5em;
		box-sizing: border-box;
		border-radius: 3px;
		text-align: center;
		text-transform: uppercase;
	}

	.login-form-forgot-password {
		text-align: center;
		color: grey;
		padding: 0.5em;
		margin-top: 0.5em;
		box-sizing: border-box;
		position: relative;
		cursor: pointer;
	}

	.login-form-forgot-password:hover:after {
		position: absolute;
		top: 110%;
		left: 0;
		right: 0;
		content: "\a0";
		display: block;
		margin: 0 4em;
		border-top: 2px solid #EBEBEB;
	}

	.login-form-add-account-button:hover,
	.login-form-login-button:hover {
		background-color: #2980b9;
		cursor: pointer;
	}

	/*.change-email-form,
	.change-password-form,
	.reset-password-form {
		display: none;
	}*/
</style>
