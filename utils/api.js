const request = require('./request')
const {
  getUserIDFromStorage
} = require('./util')

function login(data) {
  return request.get('/login', data)
}

function verify() {
  return request.get('/verify')
}


function creatBook(data) {
  const userID = getUserIDFromStorage()
  return request.post(`/book/create?user_id=${userID}`, data)
}

function getBookListCreatedByUser(data) {
  const userID = getUserIDFromStorage()
  data['user_id'] = userID
  return request.get('/book/list/user', data)
}

function getUserSummary() {
  const userID = getUserIDFromStorage()
  const data = {}
  data['user_id'] = userID
  return request.get('/users/summary', data)
}

module.exports = {
  login,
  verify,
  creatBook,
  getBookListCreatedByUser,
  getUserSummary
}