// pages/home/home.js
const api = require('../../utils/api')
const {
  avatars
} = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 20,
    curIndex: 0,
    page: 1,
    books: [],
    users: [],
    likes: [false, false, false, false, false]
  },
  reset() {
    this.setData({
      value: 20,
      curIndex: 0,
      likes: [false, false, false, false, false]
    })
    this.loadBookList()
  },
  toggleLike() {
    const {
      curIndex
    } = this.data
    if (curIndex === 5) {
      this.reset()
      return
    }
    let tempLikes = this.data.likes
    tempLikes[curIndex] = !tempLikes[curIndex]
    this.setData({
      likes: tempLikes
    })
    // mark: 在这里调用添加 like 的接口和取消 like 的接口
  },
  onChange(e) {
    const {
      current
    } = e.detail
    if (current === 5) {
      this.setData({
        curIndex: 5
      })
      return
    }
    const {
      curIndex: preIndex,
      value
    } = this.data
    if (current - preIndex > 0) {
      this.setData({
        curIndex: current,
        value: value < 100 ? 20 + current * 20 : 100
      })
    } else {
      this.setData({
        curIndex: current,
        value: value <= 100 ? 20 + current * 20 : 100
      })
    }
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
        users: list
      })
    })
  },
  async loadArticles() {
    const articles = await api.getCommentListArticle()
    const {
      list
    } = articles.data.data
    const users = list.map(book => {
      return book.user_id
    })
    this.setData({
      books: list
    })
    this.loadUsers(users)
  },
  async judgeLike(bookIDs) {
    let res = await api.bookJudge(bookIDs)
    const likes = res.data.data.list.map(j => {
      return j.islike
    })
    this.setData({
      likes: likes
    })
  },
  async loadBookList() {
    const {
      page
    } = this.data
    let data = {
      page,
      size: 5
    }
    this.data.page++
    const bookList = await api.getBookList(data)
    const {
      list
    } = bookList.data.data
    const users = list.map(book => {
      return book.user_id
    })
    const bookIDs = list.map(book => {
      return book._id
    })
    this.setData({
      books: list
    })
    this.loadUsers(users)
    this.judgeLike(bookIDs)
  },
  gotoUserInfo(e){
    const {userId} = e.currentTarget.dataset
    // mark: 添加跳转到用户信息的页面
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.loadBookList()
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