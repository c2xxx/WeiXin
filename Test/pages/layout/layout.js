// pages/layout/layout.js

function Cat(name1) {
  this.name = name1;
  this.marginTop='0px';
  this.top = "-20px";
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cat01: new Cat('金毛'),
    cat02: new Cat('黄毛'),
    message1: '您好，我是modal对话框',
    modalHidden: true,
    animation: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  click2: function (e) {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    // this.animation = animation 
    console.log('1234567890' + this.data.cat01.name);
    this.setData({
      message1: "点击了" + e.currentTarget.dataset.id,
      modalHidden: false
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 页面渲染完成
    //实例化一个动画
    this.animation = wx.createAnimation({
      // 动画持续时间，单位ms，默认值 400
      duration: 200,
      /**
       * http://cubic-bezier.com/#0,0,.58,1  
       *  linear  动画一直较为均匀
       *  ease    从匀速到加速在到匀速
       *  ease-in 缓慢到匀速
       *  ease-in-out 从缓慢到匀速再到缓慢
       * 
       *  http://www.tuicool.com/articles/neqMVr
       *  step-start 动画一开始就跳到 100% 直到动画持续时间结束 一闪而过
       *  step-end   保持 0% 的样式直到动画持续时间结束        一闪而过
       */
      // timingFunction: 'linear',
      timingFunction: 'ease-in-out', 
      // 延迟多长时间开始
      delay: 0,
      /**
       * 以什么为基点做动画  效果自己演示
       * left,center right是水平方向取值，对应的百分值为left=0%;center=50%;right=100%
       * top center bottom是垂直方向的取值，其中top=0%;center=50%;bottom=100%
       */
      transformOrigin: 'center center center',
      success: function (res) {
        console.log(res) 
      }
    })
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

  ,

  modalBindaconfirm: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      show: !this.data.show,
      tip: '您点击了【确认】按钮！',
      buttonDisabled: !this.data.buttonDisabled
    })
  },
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
      tip: '您点击了【取消】按钮！'
    })
  },
  rotate: function (e) {
    //顺时针旋转10度
    //
    // this.animation.rotate(-15).step()

    var len=this.data.cat01.top
    if (len == "-20px"){
      this.data.cat01.top = "0px";
    } else {
      this.data.cat01.top = "-20px";
    }
    console.log('len=' + len);   
    this.animation.translateY(len).step()
    this.setData({
      //输出动画
      animation: this.animation.export()
    })
  }
})