const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const getUserIDFromStorage = ()=>{
  return wx.getStorageSync('userID')
}

function timeFormat(time) {
  let timestamp = Date.parse(time)
  let mistiming = Math.round((Date.now() - timestamp) / 1000);
  let arrr = ['年', '个月', '周', '天', '小时', '分钟', '秒'];
  let arrn = [31536000, 2592000, 604800, 86400, 3600, 60, 1];
  for (let i = 0; i < arrn.length; i++) {
      let inm = Math.floor(mistiming / arrn[i]);
      if (inm != 0) {
          return inm + arrr[i] + '前';
      }
  }
}

module.exports = {
  formatTime,
  getUserIDFromStorage,
  timeFormat
}
