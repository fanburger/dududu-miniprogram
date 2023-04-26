// pages/star/star.js
const api = require('../../utils/api')

const {
  avatars
} = require('../../config')

const {
  timeFormat
} = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    author: {},
    article: {},
    page: 1,
    comments: [],
    users: [],
    mycomment: ''
  },
  async createArticleComment() {
    if (!this.data.mycomment) {
      return
    }
    let {
      _id: article_id
    } = this.data.article
    let {
      mycomment: comment
    } = this.data
    let res = await api.createComment({
      comment,
      article_id
    })
    console.log(res);
    this.loadComments(article_id)
  },
  async loadUsers(users) {
    api.usersBatchMe(users).then(res => {
      let {
        list
      } = res.data.data
      list.forEach(u => {
        u.avatar = `${avatars}/${u.avatar}.png`
      })
      this.setData({
        users: this.data.users.concat(list)
      })
    })
  },
  async loadComments(article_id) {
    let comments = await api.getCommentListComment({
      article_id
    })
    const {
      list
    } = comments.data.data

    const users = list.map(com => {
      return com.user_id
    })
    this.loadUsers(users)
    list.forEach(com => {
      com['fctime'] = `${timeFormat(com.create_time)}`
    })
    this.setData({
      comments: list
    })
  },
  async loadAuthor(author_id) {
    let res = await api.getUserInfoByID(author_id)
    res.data.data['avatar'] = `${avatars}/${res.data.data.avatar}.png`
    this.setData({
      author: res.data.data
    })
  },
  async loadArticleDetail(article_id) {
    const _data = {
      article_id
    }
    const article = await api.getArticleDetail(_data)
    const {
      data
    } = article.data
    data['fctime'] = `${timeFormat(data.create_time)}`
    this.loadAuthor(data.user_id)
    this.setData({
      article: data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadArticleDetail(options.article_id)
    this.loadComments(options.article_id)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom(e) {
    // this.loadArticles()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})