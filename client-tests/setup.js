// setup JSDOM
require('jsdom-global')(`
  <div id="app"></div>
`, {
  url: "http://localhost:3030",
})

// make expect available globally
global.expect = require('expect')