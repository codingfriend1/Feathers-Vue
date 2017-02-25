// require all test files using special Webpack feature
// https://webpack.github.io/docs/context.html#require-context

require('babel-polyfill')
var testsContext = require.context('.', true, /\.spec$/)
testsContext.keys().forEach(testsContext)
