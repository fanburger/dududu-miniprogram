const config = require('../config.js')

const request = function (url, options) {
  return new Promise((resolve, reject) => {
    const app = getApp()
    wx.request({
      url: config.hostUrl + url,
      method: options.method,
      data: options.method == "GET" ? options.data : JSON.stringify(options.data),
      header: {
        'x-token': app.globalData.token
      },
      success: (res) => {
        if (res.data.code == 500) {
          wx.showToast({
            title: res.data.msg,
            icon: 'error'
          })
          reject(res.data.msg)
        } else {
          resolve(res)
        }
      },
      fail: (err) => {
        console.log(err);
        reject(err)
      }
    })
  })
}


module.exports = {
  //封装get方法
  get(url, data) {
    return request(url, {
      method: "GET",
      data
    })
  },
  //封装post方法
  post(url, data) {
    return request(url, {
      method: "POST",
      data
    })
  }
}