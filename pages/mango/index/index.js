// pages/mango/index/index.js
// 首页逻辑

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    color: 'red',
    text: 'Name',
    message: 'I Love You ...',
    id: 0,
    longitude:'',
    latitude:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
   * 改变颜色
   */
  changeColor: function (event) {
    console.log(event)
    var name = event.target.dataset.name;
    this.setData({
      color: getRandomColor(),
      text: name + " Hello !"
    })
  },
})

// 获取随机颜色
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color;
}