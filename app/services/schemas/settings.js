const p = require('../patterns.service.js')
const y = require('yup')

module.exports = y.object({
  name: y
    .string()
    .required()
    .trim()
    .matches(p.isTitle, p.messages.isTitle),
  value: y.mixed().required()
})
