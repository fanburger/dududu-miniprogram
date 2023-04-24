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
      detail:'',
      fileList: [],
    })
  },

  async createArticle() {
    const data = {
      ...this.data
    }
    api.createArticle(data).then(res => {
      this.clearContent()
    })
  },

  async loadBookInfo(book_id) {
    let res = await api.getBookDetail({
      book_id
    })
    const {
      data
    } = res.data
    this.setData({
      sentence: data.sentence,
      title: data.title,
      introduce: data.introduce,
      author: data.author,
      category: data.category,
      cover: data.cover,
      rating: 5,
      book_id: data._id,
      book_title: data.title,
      coverImages: [data.cover]
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {
      book_id
    } = options
    if (book_id) {
      this.data.book_id = book_id
      this.loadBookInfo(book_id)
    }
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

  }
})