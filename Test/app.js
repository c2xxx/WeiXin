//app.js
var _id = 0;
App({

  /*
A（1）、2、3、4、5、6、7、8、9、10、J（11）、Q（12）、K（13）、SubKing/小王（14）、King/大王（15）、

'p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9', 'p10',
      'pJ', 'pQ', 'pK', 'wangxiao', 'wangda'
*/
  PuKe: function (name) {
    this.id = _id++;
    this.name = name;
    getApp().puKeInitHelper(this);
    this.width = '180rpx';
    this.height = '250rpx';
    this.marginTop = 0;
  },
  getImgUrl: function (imgName) {
    return 'http://oxwr9u8nc.bkt.clouddn.com/' + imgName;
  },
  puKeInitHelper: function (puke) {
    var value = puke.name;
    var src = 'p' + puke.name;
    switch (puke.name) {
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
      case 'A':
        value = 14;
        src = 'p1';
        break
      case '2':
        value = 16;
        break
      case '小王':
      case 'SubKing':
        value = 20;
        src = 'wang_xiao';
        break
      case '大王':
      case 'King':
        value = 21;
        src = 'wang_da';
        break
    }
    puke.value = value;
    puke.src = 'http://oxwr9u8nc.bkt.clouddn.com/puke_' + src + '.png';
    puke.animation = '';
  },
  modifyPosition: function (list, isJiangXu) {
    var count = list.length;
    var firstLeft = 0;
    var maxCount = 15;
    if (maxCount > count) {
      firstLeft = (maxCount - count) * 20;
    }
    if (isJiangXu) {
      list.sort(function (a, b) {
        return b.value - a.value
      });
    } else {
      list.sort(function (a, b) {
        return a.value - b.value
      });
    }

    var len = list.length;
    for (var i = 0; i < len; i++) {
      var pai = list[i];
      pai.marginLeft = i * 40 + 10 + firstLeft;
    }
  },
  getPuKeInListById: function (list, id) {
    var len = list.length;
    for (var i = 0; i < len; i++) {
      var pai = list[i];
      if (id == pai.id) {
        return pai;
      }
    }
  },
  getIndexInListById: function (list, id) {
    var len = list.length;
    for (var i = 0; i < len; i++) {
      var pai = list[i];
      if (id == pai.id) {
        return i;
      }
    }
  },
  //----------------------------------
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    marginTop: -25,
    anim: wx.createAnimation({
      duration: 500,
      timingFunction: 'ease',
    }),
    animBack: wx.createAnimation({
      duration: 0,
      timingFunction: 'ease',
    })
  }
})