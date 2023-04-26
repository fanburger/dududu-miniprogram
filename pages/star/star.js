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
    users: [],
    articles: [],
    page: 1
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
  async loadArticles() {
    const data = {
      page: this.data.page++,
      size: 5
    }
    const articles = await api.getCommentListArticle(data)
    const {
      list
    } = articles.data.data
    list.forEach(artic => {
      artic['fctime'] = timeFormat(artic.create_time)
    })
    const users = list.map(artic => {
      return artic.user_id
    })
    this.setData({
      articles: this.data.articles.concat(list)
    })
    this.loadUsers(users)
  },
  gotoArticleDetail(e) {
    let {
      articleId
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/article-detail/article-detail?article_id=' + articleId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadArticles()
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
    this.loadArticles()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})