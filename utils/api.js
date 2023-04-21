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

function getBookDetail(data) {
  return request.get('/book/detail', data)
}

function getUserSummary() {
  const userID = getUserIDFromStorage()
  const data = {}
  data['user_id'] = userID
  return request.get('/users/summary', data)
}

function getMe() {
  const userID = getUserIDFromStorage()
  const data = {}
  data['user_id'] = userID
  return request.get('/users/me', data)
}

function createArticle(data) {
  const userID = getUserIDFromStorage()
  return request.post(`/comment/create/article?user_id=${userID}`, data)
}

module.exports = {
  login,
  verify,
  creatBook,
  createArticle,
  getBookDetail,
  getBookListCreatedByUser,
  getUserSummary,
  getMe
}