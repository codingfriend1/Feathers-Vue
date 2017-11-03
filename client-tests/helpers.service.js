exports.click = function click(el) {
  var event = new MouseEvent('click')
  el.dispatchEvent(event)
}