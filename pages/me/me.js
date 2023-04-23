// pages/me/me.js
const api = require('../../utils/api')
const {avatars} = require('../../config')
const {
  timeFormat
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
    mycomments: []
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
  async loadMe(){
    api.getMe().then(res=>{
      let {data} = res.data
      data.avatar = `${avatars}/${data.avatar}.png`
      this.setData({
        me: res.data.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadMybook()
    this.loadUserSummary()
    this.loadMe()
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