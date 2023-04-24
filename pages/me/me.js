// pages/me/me.js
const api = require('../../utils/api')
const {
  avatars
} = require('../../config')
const {
  timeFormat,
  getUserIDFromStorage
} = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    summary: {
      "like_count": 0,
      "follow_to": 0,
      "follow_from": 0
    },
    me: {},
    mybooks: [],
    likesCount: [],
    myArticles: []
  },
  async judgeLike(bookIDs) {
    let res = await api.bookJudge(bookIDs)
    const likes = res.data.data.list.map(j => {
      return j.count
    })
    this.setData({
      likesCount: likes
    })
  },
  loadMybook() {
    wx.showLoading({
      title: '加载中'
    })
    api.getBookListCreatedByUser({
      page: 1,
      size: 10
    }).then(res => {
      let {
        list
      } = res.data.data
      const bookIDs = list.map(book => {
        return book._id
      })
      this.judgeLike(bookIDs)
      list.forEach(book => {
        book['fctime'] = timeFormat(book.create_time)
      })
      this.setData({
        mybooks: list
      })
      wx.hideLoading()
    })
  },
  loadUserSummary() {
    api.getUserSummary().then(res => {
      this.setData({
        summary: res.data.data
      })
    })
  },
  async loadMe() {
    api.getMe().then(res => {
      let {
        data
      } = res.data
      data.avatar = `${avatars}/${data.avatar}.png`
      this.setData({
        me: res.data.data
      })
    })
  },
  gotoBookDetail(e) {
    console.log(e);
    const {
      bookId
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/book-info/bookinfo?book_id=' + bookId,
    })
  },
  async loadUserArticles() {
    const user_id = getUserIDFromStorage()

    const data = {
      page: 1,
      size: 5
    }
    let res = await api.getUserArticles(user_id, data)
    let {
      list
    } = res.data.data
    list.forEach(a=>{
      a['fctime'] = `${timeFormat(a.create_time)}`
    })
    this.setData({
      myArticles: list
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadMybook()
    this.loadUserSummary()
    this.loadMe()
    this.loadUserArticles()
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
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})