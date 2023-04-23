const api = require('./utils/api')
import Toast from '@vant/weapp/toast/toast'

App({
  quickLogin() {
    wx.login({
      success: (res) => {
        console.log(res);
        api.login({
          code: res.code
        }).then(res => {
          console.log(res);
          let {
            token
          } = res.data.data
          if (token) {
            wx.setStorageSync('token', token)
            this.globalData.token = token
            this.verify()
            Toast.success('登录成功')
            wx.switchTab({
              url: '/pages/home/home',
            })
          } else {
            Toast.fail('登录失败')
          }
        })
      },
    })
  },
  verify() {
    if (this.globalData.token.length == 0) {
      wx.navigateTo({
        url: '/pages/login/index'
      })
      return
    }
    api.verify().then(res => {
      let {
        user_id
      } = res.data.data
      if (user_id) {
        wx.setStorageSync('userID', user_id)
        this.globalData.userID = user_id
      }
    })
  },
  globalData: {
    token: '',
    userID: ''
  },
  onLaunch() {
    this.globalData = {}
    let token = wx.getStorageSync('token')
    this.globalData.token = token
  }
})