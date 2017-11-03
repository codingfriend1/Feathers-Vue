/**
 *
 * Global Notification Library
 *
 * Replace methods on the global with you own call backs so you can readily replace the notification system
 */


if(process.env.NODE_ENV === 'test' || NODE_ENV === 'test' || typeof window === 'undefined') {
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
} else {
  const toastr = require('toastr');
  window.toastr = toastr
  window.notify = {
    warning: (...args) => {
      toastr.warning(...args)
    },

    success: (message) => {
      toastr.success(message)
    },

    error: (...args) => {
      toastr.error(...args)
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
      toastr.clear()
    }
  }
}
