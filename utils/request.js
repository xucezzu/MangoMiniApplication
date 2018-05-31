/**
 * 网络请求的方法集
 */

const BaseUrl = 'http://121.43.103.69:9988/'
const app = getApp()
const Promisify = require('../utils/util.js')

/**
 * 上传用户数据到服务器
 */
const storageUserInfo = (openId, userNickName, userAvatar, userGender, userCity, userProvince, userCountry, funCome) => {
  console.log('[request.js]调用来自于： ' + funCome)
  wx.request({
    url: BaseUrl + 'storageUserInfo/',
    method: 'POST',
    dataType: 'json',
    header: {
      'content-type': 'application/json'
    },
    data: {
      openId: openId,
      nickName: userNickName,
      avatar: userAvatar,
      gender: userGender,
      city: userCity,
      province: userProvince,
      country: userCountry,
    },
    success: res => {
      console.log('[request.js]用户数据添加成功后返回值：' + res.data.alertMsg + ', 用户ID：' + res.data.userId)
      // 获取并保存用户ID
      app.globalData.userId = res.data.userId
      // 从服务器获取用户添加回调
      wx.showToast({
        title: res.data.alertMsg,
        icon: 'success',
        duration: 2000
      })
    }
  })
}

/**
 * 查询用户有无宝宝信息
 */
const queryBabyInfo = (userId) => {
  console.log('[request.js]用户id： ' + userId)
  return new Promise((resolve, reject) => {
    wx.request({
      url: BaseUrl + 'queryBabyInfo/',
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/json'
      },
      data: {
        userId: userId
      },
      success: res => {
        console.log('[request.js]查询宝宝信息返回：' + res.data.alertMsg)
        resolve(res.data)
      }
    })
  })
}

/**
 * 模块只有通过 module.exports 才能对外暴露接口
 */
module.exports = {
  storageUserInfo: storageUserInfo,
  queryBabyInfo: queryBabyInfo,
}