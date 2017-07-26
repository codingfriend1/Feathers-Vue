/**
 *
 * Global Notification Library
 *
 * Replace methods on the window with you own call backs so you can readily replace the notification system
 */

// Client side notifications
try {

  const holdingTime = 5000

  const notificationDefaults = { 
    closeIcon: true,
    closeOnClick: true,
    hold: holdingTime
  }
  
  window.notify = {
    warning: (message) => {
      window.f7.addNotification(Object.assign(notificationDefaults, { message }))
    },

    success: (message) => {
      window.f7.addNotification(Object.assign(notificationDefaults, { message }))
    },

    error: (message) => {
      console.log('message', message);
      window.f7.addNotification(Object.assign(notificationDefaults, { message }))
    },

    log: (...args) => {
      console.log(...args)
    },

    debug: (title, err) => {
      if(err) {
        console.log(title, JSON.stringify(err || {}, null, 2))
      } else {
        console.log(title)
      }
    },

    clear: (...args) => {
      // toastr.clear()
    }
  }
} catch(err) {}

// Server side notifications
try {
  if(typeof window === 'undefined') {
    global.notify = {
      warning: (...args) => {
        console.log("Warning: ", ...args );
      },
      success: (...args) => {
        console.log("Success: ", ...args);
      },
      error: (...args) => {
        console.log('Error: ', ...args);
      },
      log: (...args) => {
        console.log(...args);
      },
      debug: (title, err) => {
        console.log(title, JSON.stringify(err || {}, null, 2))
      },
      clear: () => {}
    }
  }
} catch(err) {}
