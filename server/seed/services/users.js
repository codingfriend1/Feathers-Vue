const isTest = process.env.NODE_ENV === 'test'

const users = !isTest ? [] : [{
  name: 'Jimmy the tester',
  email: 'admin@test.com',
  password: 'admin',
  role: 'admin'
}]


module.exports = users