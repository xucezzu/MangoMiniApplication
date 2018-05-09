/**
 * Author：徐长策
 * 作用：小程序逻辑层
 */
let loginUrl = 'http://121.43.103.69:9988/miniMAppUserLoginCode/'

App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    console.log('[app.js]APP Launch ...')

    // 登录
    wx.login({
      success: res => {
        console.log('[app.js]小程序获取临时登录凭证号，返回的Code：' + res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: loginUrl,
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/json'
            },
            data: {
              code: res.code
            },
            success: res => {
              console.log('[app.js]登录成功后返回值：' + res.data.openID)
              // 从服务器获取用户OPENID回调
              wx.showToast({
                title: res.data.alertMsg,
                icon: 'success',
                duration: 2000
              })
              this.globalData.userOpenId = res.data.openID
            }
          })
        } else {
          console.log('[app.js]登录失败！' + res.errMsg)
        }
      }
    })

    // 获取用户授权
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          console.log('[app.js]用户未同意获取头像信息...')
          /**
           * 弹框提示用户获取用户信息
           */
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              console.log('[app.js]用户已同意获取头像等信息...')
              /**
               * 用户同意获取用户信息
               * 1:获取变量的数据类型是 typeof()
               * 2:string类型转JSON 用 parse 不要使用 stringify
               */
              wx.getUserInfo({
                success: res => {
                  console.log('[app.js]用户姓名： ' + res.userInfo.nickName)
                  this.globalData.userInfo = res.userInfo
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                },
                fail: function () {
                  console.log('[app.js]获取用户信息失败...')
                }
              })
            }
          })
        } else {
          console.log('[app.js]用户已同意获取头像信息...')
          /**
           * 已经授权获取用户信息
           * 1:获取变量的数据类型是 typeof()
           * 2:string类型转JSON 用 parse 不要使用 stringify
           */
          wx.getUserInfo({
            success: res => {
              console.log('[app.js]用户姓名： ' + res.userInfo.nickName)
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
            fail: function () {
              console.log('[app.js]获取用户信息失败...')
            }
          })
        }
      }
    })

    // 核对Session信息
    wx.checkSession({
      success: function () {
        // session_key未过期
        console.log('[app.js]Session_Key 未过期...')
      },
      fail: function () {
        // session_key已过期，重新登录
        wx.login({
          success: function (res) {
            console.log('[app.js]小程序获取临时登录凭证号，返回的Code：' + res.code)
            if (res.code) {
              //发起网络请求
              wx.request({
                url: loginUrl,
                method: 'POST',
                dataType: 'json',
                data: {
                  code: res.code
                }
              })
            } else {
              console.log('[app.js]登录失败！' + res.errMsg)
            }
          }
        })
      }
    })
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    console.log('[app.js]APP Show ...')
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {

  },

  /**
   * 全局变量
   */
  globalData: {
    userInfo: null,
    userOpenId: null,
  }
})
