const p = require('../patterns.service.js')
const y = require('yup')

module.exports = y.object({
  text: y.string().required(),
  userId: y.string().required(),
  createdAt: y.date().default(() => new Date),
  updatedAt: y.date().default(() => new Date)
})


