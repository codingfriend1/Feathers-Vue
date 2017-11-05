const p = require('../patterns.service.js')
const y = require('yup')

const sitePermissions = [
  'email',
  'delete',
  'create',
  'update',
  'read',
  'manageUsers',
  'manageMessages',
  'manageRoles',
  'manageSettings'
]

module.exports = y.object({
  role: y
    .string()
    .required()
    .trim()
    .matches(p.isTitle, p.messages.isTitle),
  permissions: y.array().oneOf(sitePermissions),
  createdAt: y.date().default(() => new Date),
  updatedAt: y.date().default(() => new Date)
})