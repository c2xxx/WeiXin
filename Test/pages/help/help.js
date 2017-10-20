// pages/help.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    describe: '斗地主双方明牌，规则是可以炸，可以三个不带，可以三带一，但不能三带二，可以四带二，也可以出顺子，农民先出牌，请问农民怎么才能赢？',
    helpImg: app.getImgUrl('game_05.jpg')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //传了两个参数：image，ruleText 
    // 页面初始化 options为页面跳转所带来的参数 
    var image = options.image;
    var ruleText = options.ruleText;
    // console.log('image=' + image + '  ruleText=' + ruleText);
    image = image ? image : this.data.helpImg;
    ruleText = ruleText ? ruleText : this.data.describe;
    if (image) {
      this.setData({
        helpImg: image,
        describe: ruleText
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

  }
})