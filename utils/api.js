const request = require('./request')
const {getUserIDFromStorage} = require('./util')

function login(data) {
  return request.get('/login', data)
}

function verify() {
  return request.get('/verify')
}


function creatBook(data) {
  const userID= getUserIDFromStorage()
  return request.post(`/book/create?user_id=${userID}`,data)
}

module.exports = {
  login,
  verify,
  creatBook
}