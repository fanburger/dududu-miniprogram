const request = require('./request')

function login(data) {
  return request.get('/login', data)
}

function verify() {
  return request.get('/verify')
}

module.exports = {
  login,
  verify
}