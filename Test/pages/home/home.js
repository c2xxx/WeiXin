// pages/home/home.js


var app = getApp();
var paiju = require('../../utils/paiju.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paijuList: paiju.allGame(),
    indicatorDots: true,//显示小点
    autoplay: true,//自动播放
    interval: 4000,
    duration: 500
  },
  //练习
  doPractice: function (e) {
    var item = e.currentTarget.dataset.item;
    this.goto(item,true);
  },
  //挑战
  doPlay: function (e) {
    var item = e.currentTarget.dataset.item;
    this.goto(item, false);
  },
  //随机练习
  playRandom: function (e) {
    var item = paiju.randomGame();
    this.goto(item, true);
  },
  //跳转
  goto: function (item, isPritace) {
    console.log('练习？' + isPritace + ",牌局：");
    console.log(item);
    wx.navigateTo({
      url: '../practice/practice?id='+item.id,
    })
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

  }
})