
const admin = {
  role: 'admin',
  permissions: [
    'email',
    'create',
    'read',
    'update',
    'delete',
    'manageUsers',
    'manageRoles',
    'manageSettings'
  ]
}

const basic = {
  role: 'basic',
  permissions: [
    'read'
  ]
}

module.exports = [admin, basic]
