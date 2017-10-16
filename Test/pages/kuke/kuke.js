// pages/kuke/kuke.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iconSize: [10, 20, 30],
    typeList: ['success', 'success_no_circle', 'info', 'warn', 'waiting', 'cancel', 'download', 'search', 'clear'],
    btnText: '按钮',
    iconColor: [
      'red', 'orange', 'yellow', '#FF0000', 'green', 'rgb(0,255,255)', 'blue', 'purple'
    ], 
    src: '../../resources/cat.jpg',
    src2: 'https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1683657992,1868502675&fm=58&u_exp_0=1116624377,1535197265&fm_exp_0=86&bpow=1024&bpoh=768',
    title: '标题'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // other.js
    var appInstance = getApp()
    console.log(appInstance.globalData) // I am global data
  },

  clickBtn: function () {
    this.setData({ btnText: '哈哈哈' });
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

  }
})