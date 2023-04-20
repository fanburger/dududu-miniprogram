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
    fileList: [],
  },
  // 上传图片
  uploadToCloud(event) {
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
        const newFileList = this.data.fileList.concat(url)
        this.setData({
          fileList: newFileList
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

  createBook() {
    let data = {
      ...this.data
    }
    api.creatBook(data).then(res => {
      wx.showToast({
        title: '发表成功',
        icon: 'success'
      })
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
    console.log('click');
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