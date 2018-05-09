/**
 * require 暂不支持绝对路径
 */
var util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowInfoView: false,
    showBabyNameModal: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用函数时，返回值是日期和时间  
    var date = util.dateNow();
    // 再通过setData更改Page()里面的data，动态更新页面的数据  
    this.setData({
      date: date
    });
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
   * 显示弹窗-修改baby姓名
   */
  showBabyNameDialog: function () {
    this.setData({
      showBabyNameModal: true
    })
  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },

  /**
   * 隐藏弹框-修改baby姓名
   */
  hideBabyNameDialog: function () {
    this.setData({
      showBabyNameModal: false
    });
  },

  /**
   * 弹框-修改baby姓名-取消按钮-点击事件
   */
  onCancel: function () {
    this.hideBabyNameDialog();
  },

  /**
   * 弹框-修改baby姓名-确认按钮-点击事件
   */
  onConfirm: function () {
    this.hideBabyNameDialog();
  },

  /**
   * 日期选择器
   */
  bindDateChange: function(e){
    this.setData({
      date: e.detail.value
    })
  },

  /**
   * 显示弹框-更换baby性别
   */
  showBabySexDialog:function(){
    this.setData({
      showBabySexModal: true
    })
  }
})