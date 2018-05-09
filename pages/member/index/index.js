/**
 * 个人主页
 * require 暂不支持绝对路径
 */
let util = require('../../../utils/request.js');
let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userAvatarUrl: 'http://121.43.103.69/media/mango-mini/icon_app_mini.png',
    userNickName: 'Mango+',
    hasUserInfo: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      console.log('[member/index.js]用户昵称1')
      // 上传用户数据到服务器
      util.storageUserInfo(app.globalData.userOpenId, app.globalData.userInfo.nickName,
        app.globalData.userInfo.avatarUrl, app.globalData.userInfo.gender, app.globalData.userInfo.city,
        app.globalData.userInfo.province, app.globalData.userInfo.country, 'index.js 已同意')
      this.setData({
        userAvatarUrl: app.globalData.userInfo.avatarUrl,
        userNickName: app.globalData.userInfo.nickName,
        hasUserInfo: true
      })
    } else {
      console.log('[member/index.js]用户昵称2')
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            userAvatarUrl: res.userInfo.avatarUrl,
            userNickName: res.userInfo.nickName,
            hasUserInfo: true
          })
          // 上传用户数据到服务器
          console.log('[member/index.js] \n' + 'OpenID: ' + app.globalData.userOpenId + '\n' + 'nickName: ' + res.userInfo.nickName + '\n')
          util.storageUserInfo(app.globalData.userOpenId, res.userInfo.nickName,
            res.userInfo.avatarUrl, res.userInfo.gender, res.userInfo.city,
            res.userInfo.province, res.userInfo.country, 'index.js 未同意')
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 跳转到信息设置页面
   */
  infoToNextPage: function (event) {
    wx.navigateTo({
      url: '../../member/information/information',
      success: function () {
        console.log('[member/index.js]跳转成功...')
      },
      fail: function () {
        console.log('[member/index.js]跳转失败...')
      },
      complete: function () {
        console.log('[member/index.js]跳转完成...')
      }
    })
  },
})