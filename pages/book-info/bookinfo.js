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
    book_id: '',
    bookinfo: {},
    articles: [],
    page:1
  },
  async loadUsers(users) {
    const res = await api.usersBatchMe(users)
    return res
  },
  async loadBookDetail(book_id) {
    api.getBookDetail({
      book_id
    }).then(
      res => {
        this.setData({
          bookinfo: res.data.data
        })
      }
    )
  },
  async loadCommentListArticle(book_id) {
    const articles = await api.getCommentListArticle({
      book_id,
      page: this.data.page++,
      size: 0
    })
    const {
      list
    } = articles.data.data
    const users = list.map(artic => {
      return artic.user_id
    })
    const usersInfo = await this.loadUsers(users)
    console.log(usersInfo);
    for (let index = 0; index < usersInfo.data.data.list.length; index++) {
      const element = usersInfo.data.data.list[index];
      element.avatar = `${avatars}/${element.avatar}.png`
      list[index]['user_info'] = element
    }

    list.forEach(artic => {
      artic['fctime'] = timeFormat(artic.create_time)
    })
    this.setData({
      articles: list
    })
  },
  gotoWriteArticle() {
    const {
      _id
    } = this.data.bookinfo
    wx.navigateTo({
      url: '/pages/create-article/create-article?book_id=' + _id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.data.book_id = options.book_id
    this.loadBookDetail(options.book_id)
    this.loadCommentListArticle(options.book_id)
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
    this.loadCommentListArticle(this.data.book_id)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})