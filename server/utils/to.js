
exports.to = function to(promise) {
  return promise.then(result => [null, result]).catch(err => [err, null])
}