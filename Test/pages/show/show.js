// pages/show/show.js

/*
A（1）、2、3、4、5、6、7、8、9、10、J（11）、Q（12）、K（13）、SubKing（14）、King（15）、

'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10',
      'pJ', 'pQ', 'pK', 'wangxiao', 'wangda'
*/
var _marginTop = -25;
var puKeInitHelper = function (puke) {
  var value = puke.name;
  var src = 'p' + puke.name;
  switch (puke.name) {
    case 'A':
      value = 1;
      src = 'p1';
      break
    case 'J':
      value = 11;
      src = 'p11';
      break
    case 'Q':
      value = 12;
      src = 'p12';
      break
    case 'K':
      value = 13;
      src = 'p13';
      break
    case '小王':
    case 'SubKing':
      value = 14;
      src = 'wang_xiao';
      break
    case '大王':
    case 'King':
      value = 15;
      src = 'wang_da';
      break
  }
  puke.value = value;
  puke.src = 'http://oxwr9u8nc.bkt.clouddn.com/puke_' + src + '.png';
  puke.animation = '';
}

var _id = 0;
function PuKe(name) {
  this.id = _id++;
  this.name = name;
  puKeInitHelper(this);
  this.selected = false;
  this.index = this.value;
  this.width = '180rpx';
  this.height = '250rpx';
  this.marginLeft = this.value * 40 - 30;
  this.marginTop = _marginTop;
} 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    modalHidden: true,
    test: 1,
    diZhuList: [],
    animation1: '',
    allPai: [
      new PuKe('A'),
      new PuKe('2'),
      new PuKe('3'),
      new PuKe('4'),
      new PuKe('5'),
      new PuKe('6'),
      new PuKe('7'),
      new PuKe('8'),
      new PuKe('9'),
      new PuKe('10'),
      new PuKe('J'),
      new PuKe('Q'),
      new PuKe('K'),
      new PuKe('小王'),
      new PuKe('大王')
    ]
  },
  getPuKeById: function (id) {
    var len = this.data.allPai.length;
    for (var i = 0; i < len; i++) {
      var pai = this.data.allPai[i];
      if (id == pai.id) {
        return pai;
      }
    }
  },
  getIndexById: function (id) {
    var len = this.data.allPai.length;
    for (var i = 0; i < len; i++) {
      var pai = this.data.allPai[i];
      if (id == pai.id) {
        return i;
      }
    }
  },
  clickPuKe: function (e) {
    var id = e.currentTarget.dataset.id;
    var pai = this.getPuKeById(id);
    var index = this.getIndexById(id);
    console.log("点击了:" + pai.name + ' index=' + index);

    var marginTop = pai.marginTop;
    console.log(marginTop);
    if (marginTop == _marginTop) {
      pai.marginTop = 0;
    } else {
      pai.marginTop = _marginTop;
    }

    this.animationX.translateY(marginTop).step()
    var param = {}; 
    var key = 'allPai[' + index + '].animation';   
    param[key] = this.animationX.export();
    this.setData(param);  
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
    // 页面渲染完成
    // var len = this.data.allPai.length;
    // for (var i = 0; i < len; i++) {
    //   var pai = this.data.allPai[i];
    //   pai.animation = this.getAnim();
    // }
    this.animationX = this.getAnim();
  },
  getAnim: function () {
    return wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log('onShow' + (new Pai()));
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