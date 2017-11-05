const Vue = require('vue')
const router = require('@app/boot/router')

exports.click = function click(el) {
  var event = new MouseEvent('click')
  el.dispatchEvent(event)
}

async function asyncTimeout(time) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

async function asyncRouterReady(time) {
  return new Promise(resolve => {
    router.onReady(() => resolve())
  })
}

exports.waitForAppLoad = async function() {
  await asyncRouterReady()
  await asyncTimeout(1000)
  await Vue.nextTick
}

exports.asyncTimeout = asyncTimeout
exports.asyncRouterReady = asyncRouterReady