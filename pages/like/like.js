// pages/like/like.js

const api = require('../../utils/api')
const {
  timeFormat
} = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mybooks: []
  },
  async loadBookUsers() {
    const data = {
      page: 1,
      size: 100
    }
    const res = await api.getBookUsers(data)
    const {
      list
    } = res.data.data
    const books = await api.bookBatchList(list)
    books.data.data.list.forEach(book => {
      book['fctime'] = timeFormat(book.create_time)
    })
    this.setData({
      mybooks: books.data.data.list
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadBookUsers()
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