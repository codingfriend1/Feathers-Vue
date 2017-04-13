require('./services/auth.service')
require('./vendor')

// remount vue app from client because the server makes a one time static render that's not interactable and will cause full page reloads when navigating
require('./boot')

// We require app.styl last because it has a style that hides the #cover over the app to hide the style flicker. This was a better option then creating a second styles bundle that would have almost doubled the code size due to needing to load babel again for the .vue files.
require('./css/app.styl')
