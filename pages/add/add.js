const api = require('../../utils/api')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showContent: 'sentence',
    sentence: '',
    title: '',
    introduce: '',
    author: '',
    category: '',
    cover: '',
    rating: 5,
    book_id: '',
    book_title: '',
    detail:'',
    fileList: [],
    images: [],
    coverImages: []
  },
  uploadCoverToCloud(event) {
    const {
      url
    } = event.detail.file
    wx.cloud.init();

    const fileName = url.substring(url.lastIndexOf('/') + 1);
    wx.cloud.uploadFile({
      cloudPath: `coverImages/${fileName}`,
      filePath: url,
      success: res => {
        console.log(res);
        const newFileList = this.data.coverImages.concat(url)
        this.setData({
          coverImages: newFileList
        })
        this.data.cover = res.fileID
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
      },
      fail: err => {
        wx.showToast({
          title: '添加失败',
          icon: "error"
        })
        console.log(err);
      }
    })
  },
  // 上传图片
  uploadToCloud(event) {
    const {
      url
    } = event.detail.file
    wx.cloud.init();

    const fileName = url.substring(url.lastIndexOf('/') + 1);
    wx.cloud.uploadFile({
      cloudPath: `articleImages/${fileName}`,
      filePath: url,
      success: res => {
        console.log(res);
        const newFileList = this.data.fileList.concat(url)
        this.setData({
          fileList: newFileList
        })
        this.data.images.push(res.fileID)
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
      },
      fail: err => {
        wx.showToast({
          title: '添加失败',
          icon: "error"
        })
        console.log(err);
      }
    })
  },
  clearContent() {
    this.setData({
      sentence: '',
      title: '',
      introduce: '',
      author: '',
      category: '',
      cover: '',
      rating: 5,
      fileList: [],
    })
  },

  async createBook() {
    let data = {
      ...this.data
    }
    let rsp = await api.creatBook(data)

    this.setData({
      book_id: rsp.data.data,
      book_title: this.data.title
    })
    wx.showToast({
      title: '发表成功',
      icon: 'success'
    })
  },

  async createArticle() {
    await this.createBook()

    const data = {
      ...this.data
    }
    api.createArticle(data).then(res => {
      this.clearContent()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  switchToBookInfo() {
    this.setData({
      showContent: 'bookinfo'
    })
  },

  switchToSentence() {
    this.setData({
      showContent: 'sentence'
    })
  },

  changeRate(event) {
    this.setData({
      rating: event.detail
    })
  }
})