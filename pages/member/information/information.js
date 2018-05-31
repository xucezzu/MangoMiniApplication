/**
 * require 暂不支持绝对路径
 */
const util = require('../../../utils/util.js')
const requestUtil = require('../../../utils/request.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    showBabyNameModal: false,
    showBabySexModal: false,
    babyName: 'Mango',
    imageUrl: app.globalData.baseResImgUrl + 'icon_app_mini.png',
    genderItems: [
      { name: '男', value: '男', checked: true },
      { name: '女', value: '女', },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('[member/information.js] onLoad')
    console.log('[member/information.js] onLoad 传过来的内容 ： ' + options.id)
    // 调用函数时，返回值是日期和时间  
    // var date = util.dateNow();
    // this.setData({
    //   date: date
    // });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('[member/information.js] onShow')
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('[member/information.js] onReady')
    // 查看用户是否存有宝宝信息
    console.log('[member/information.js]获取用户ID：' + app.globalData.userId)
    this.showBabyInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('[member/information.js] onHide')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('[member/information.js] onUnload')
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
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },

  /**
   * 日期选择器, 日期改变时要触发服务器修改
   */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    });
    this.storageBabyDay(app.globalData.userId, e.detail.value);
  },

  /**
   * 显示用户信息
   */
  showBabyInfo: function () {
    let that = this;
    wx.request({
      url: 'http://121.43.103.69:9988/queryBabyInfo/',
      data: {
        userId: app.globalData.userId
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      success: res => {
        console.log('[member/information.js]查询宝宝信息返回：' + res.data.alertMsg)
        if (1 == res.data.errCode) {
          that.setData({
            babyName: '无',
            date: '无',
            gender: '无',
            imageUrl: app.globalData.baseResImgUrl + 'icon_app_mini.png'
          });
        } else if (0 == res.data.errCode) {
          if (res.data.babyInfo[0].babyName.length > 0) {
            that.setData({
              babyName: res.data.babyInfo[0].babyName
            })
          } else {
            that.setData({
              babyName: '无'
            })
          };

          if (res.data.babyInfo[0].birthday.length > 0) {
            that.setData({
              date: res.data.babyInfo[0].birthday
            })
          } else {
            that.setData({
              date: '无'
            })
          };

          if (res.data.babyInfo[0].babyGender.length > 0) {
            that.setData({
              gender: res.data.babyInfo[0].babyGender
            })
          } else {
            that.setData({
              gender: '无'
            })
          };

          if (res.data.babyInfo[0].babyImage.length > 0) {
            that.setData({
              imageUrl: res.data.babyInfo[0].babyImage
            })
          } else {
            that.setData({
              imageUrl: app.globalData.baseResImgUrl + 'icon_app_mini.png'
            })
          };
        }
      }
    })
  },

  /**
   * 显示弹窗-修改宝宝姓名
   */
  showBabyNameDialog: function () {
    this.setData({
      showBabyNameModal: true
    })
  },

  /**
   * 隐藏弹框-修改宝宝姓名
   */
  hideBabyNameDialog: function () {
    this.setData({
      showBabyNameModal: false
    });
  },

  /**
   * 显示输入的内容
   */
  inputChangeBabyName: function (e) {
    this.setData({
      babyName: e.detail.value
    })
  },

  /**
   * 弹框-修改宝宝姓名-取消按钮-点击事件
   */
  onCancelBabyName: function () {
    this.hideBabyNameDialog();
  },

  /**
   * 弹框-修改宝宝姓名-确认按钮-点击事件
   */
  onConfirmBabyName: function (e) {
    this.hideBabyNameDialog();
    console.log('[member/information.js]点击确定后宝宝姓名【姓名】：' + this.data.babyName);
    console.log('[member/information.js]点击确定后宝宝姓名【ID】：' + app.globalData.userId);
    this.storageBabyName(app.globalData.userId, this.data.babyName);
  },

  /**
   * 上传宝宝姓名
   */
  storageBabyName: function (userId, babyName) {
    let that = this;
    wx.request({
      url: 'http://121.43.103.69:9988/storageBabyInfoName/',
      data: {
        userId: userId,
        babyName: babyName
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      success: res => {
        wx.showToast({
          title: res.data.alertMsg,
          icon: 'none'
        })
      }
    })
  },

  /**
   * 显示弹框-更换baby性别
   */
  showBabySexDialog: function () {
    this.setData({
      showBabySexModal: true
    })

  },

  /**
   * 隐藏弹框-更换baby性别
   */
  hideBabySexDialog: function () {
    this.setData({
      showBabySexModal: false
    });
  },

  /**
   * 选择宝宝性别
   */
  changeBabyGender: function (e) {
    this.setData({
      gender: e.detail.value
    })
  },

  /**
   * 弹框-修改宝宝性别-取消按钮-点击事件
   */
  onCancelBabySex: function () {
    this.hideBabySexDialog();
  },

  /**
   * 弹框-修改宝宝姓名-确认按钮-点击事件
   */
  onConfirmBabySex: function (e) {
    this.hideBabySexDialog();
    console.log('[member/information.js]点击确定后宝宝性别【性别】：' + this.data.gender);
    console.log('[member/information.js]点击确定后宝宝性别【ID】：' + app.globalData.userId);
    this.storageBabyGender(app.globalData.userId, this.data.gender);
  },  

  /**
   * 上传宝宝性别
   */
  storageBabyGender: function (userId, babyGender) {
    let that = this;
    wx.request({
      url: 'http://121.43.103.69:9988/storageBabyInfoGender/',
      data: {
        userId: userId,
        babyGender: babyGender
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      success: res => {
        wx.showToast({
          title: res.data.alertMsg,
          icon: 'none'
        })
      }
    })
  },

  /**
   * 上传宝宝出生日期
   */
  storageBabyDay: function (userId, birthday) {
    let that = this;
    wx.request({
      url: 'http://121.43.103.69:9988/storageBabyInfoDay/',
      data: {
        userId: userId,
        birthday: birthday
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      dataType: 'json',
      success: res => {
        wx.showToast({
          title: res.data.alertMsg,
          icon: 'none'
        })
      }
    })
  },
})