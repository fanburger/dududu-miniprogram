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

function getBookList(data) {
  return request.get('/book/list', data)
}

function bookJudge(data) {
  const userID = getUserIDFromStorage()
  data['user_id'] = userID
  return request.post(`/book/judge?user_id=${userID}`, data)
}

function getBookUsers(data) {
  const userID = getUserIDFromStorage()
  data['user_id'] = userID
  return request.get('/book/users', data)
}

function bookBatchList(data) {
  return request.post('/book/batch_list', data)
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

function getCommentListArticle() {
  const data = {
    page: 1,
    size: 5
  }
  return request.get('/comment/list/artical', data)
}

function usersBatchMe(users) {
  return request.post('/users/batch_me', users)
}

module.exports = {
  login,
  verify,
  creatBook,
  createArticle,
  getCommentListArticle,
  getBookDetail,
  getBookList,
  getBookListCreatedByUser,
  bookJudge,
  getBookUsers,
  bookBatchList,
  getUserSummary,
  getMe,
  usersBatchMe
}