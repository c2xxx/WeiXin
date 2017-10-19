// pages/canju/practice.js

var isDebug = false;
var util = require('../../utils/doudizhu.js');
var app = getApp();//获取应用实例
var PlayModel = function (player, pukuList) {
  this.player = player;//famer或dizhu
  this.pukeList = pukuList;//出牌列表
  this.isPass = !pukuList || pukuList == null || '';
  this.notPass = !this.isPass;
}

Page({
  /**
   * 页面的初始数据
   */
  data: {
    temp: '',
    hasFinish: false,//是否结束了
    notice: '',
    visible_famer_play: '',
    enable_famer_play: "",
    enable_famer_pass: "",
    visible_dizhu_play: '',
    visible_reset: isDebug ? '' : 'hidden',
    enable_dizhu_play: "",
    enable_dizhu_pass: "",
    lastPlay: new PlayModel('dizhu', null),
    modalHidden: true,
    famer_played: [],
    dizhu_played: [],
    dizhu: [],
    famer: []
  },
  resetListSelected: function (list) {
    var animation = app.globalData.animBack;
    animation.translateY(0).step()
    var valueAnim = animation.export();
    var len = list.length;
    for (var i = 0; i < len; i++) {
      var pai = list[i];
      pai.animation = valueAnim;
      pai.marginTop = 0;
    }
    return list;
  },
  clickPuKe: function (e) {
    var id = e.currentTarget.dataset.id;
    var groupName = e.currentTarget.dataset.group_name;
    var isFamer = groupName == 'famer';
    var isDiZhu = groupName == 'dizhu';
    var list;
    if (isDiZhu) {
      list = this.data.dizhu;
    }
    if (isFamer) {
      list = this.data.famer;
    }
    var pai = app.getPuKeInListById(list, id);
    var index = app.getIndexInListById(list, id); 

    var marginTop = pai.marginTop;
    if (marginTop == 0) {
      pai.marginTop = app.globalData.marginTop;
    } else {
      pai.marginTop = 0;
    }

    var animation = app.globalData.anim;
    animation.translateY(pai.marginTop).step()
    var param = {};
    var keyAnim = groupName + '[' + index + '].animation';
    var valueAnim = animation.export(); 
    param[keyAnim] = valueAnim; 
    this.setData(param);
    this.refreshButton();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  refreshButton: function () {
    var lastPlay = this.data.lastPlay;
    var isFinish = this.data.hasFinish;//是否结束了
    var isDizhu = lastPlay.player == 'dizhu';
    var nextPlayer = isDizhu ? 'famer' : 'dizhu';
    if (isFinish) {
      nextPlayer = '';
    }
    var canPass = lastPlay.notPass;
    // console.log('canPass' + canPass); 
    var lastList = lastPlay.pukeList;
    console.log(lastList);
    if (!lastList) {
      lastList = [];
    }
    app.modifyPosition(lastList, false);
    if (nextPlayer == 'famer') {
      var list = this.getSelectedPuke(this.data.famer);
      var noSelected = this.listIsEmpty(list);
      this.setData({
        enable_famer_play: noSelected ? "disble" : "",
        enable_famer_pass: canPass ? "" : 'disble',
        enable_dizhu_play: "disble",
        enable_dizhu_pass: "disble",
        visible_famer_play: '',
        visible_dizhu_play: 'hidden',//hidden
        visible_reset: 'hidden',//hidden
        famer_played: [],
        dizhu_played: lastList,
        notice: '现在是农民出牌'
      });
    } else if (nextPlayer == 'dizhu') {
      var list = this.getSelectedPuke(this.data.dizhu);
      var noSelected = this.listIsEmpty(list);
      this.setData({
        enable_famer_play: "disble",
        enable_famer_pass: "disble",
        visible_famer_play: 'hidden',//hidden
        visible_dizhu_play: '',
        visible_reset: 'hidden',//hidden
        enable_dizhu_play: noSelected ? "disble" : "",
        enable_dizhu_pass: canPass ? "" : 'disble',
        famer_played: lastList,
        dizhu_played: [],
        notice: '现在是地主出牌'
      });
    } else {
      this.setData({
        visible_famer_play: 'hidden',//hidden
        visible_dizhu_play: 'hidden',//hidden
        famer_played: [],
        dizhu_played: [],
        visible_reset: ''
      });
    }
  },
  gotoHelp(e) {
    var url = "../help/help?imgUrl=" + app.getImgUrl('game_05.jpg');
    wx.navigateTo({
      url: url,
    })
  },
  listIsEmpty(list) {
    return JSON.stringify(list) === '[]';
  },
  getSelectedPuke: function (list) {
    var len = list.length;
    var listSelected = new Array();
    for (var i = 0; i < len; i++) {
      var pai = list[i];
      var selected = pai.marginTop != 0;
      if (selected) {
        listSelected[listSelected.length] = pai;
      }
    }
    return listSelected;
  },
  getUnSelectedPuke: function (list) {
    var len = list.length;
    var listSelected = new Array();
    for (var i = 0; i < len; i++) {
      var pai = list[i];
      var selected = pai.marginTop != 0;
      if (!selected) {
        listSelected[listSelected.length] = pai;
      }
    }
    return listSelected;
  },
  doReSet: function () {
    var listDizhu = [
      new app.PuKe('大王'),
      new app.PuKe('小王'),
      new app.PuKe('J'),
      new app.PuKe('J'),
      new app.PuKe('9'),
      new app.PuKe('9'),
      new app.PuKe('9')];
    var listFamer = [
      new app.PuKe('3'),
      new app.PuKe('3'),
      new app.PuKe('3'),
      new app.PuKe('3'),
      new app.PuKe('4'),
      new app.PuKe('5'),
      new app.PuKe('6'),
      new app.PuKe('7'),
      new app.PuKe('10'),
      new app.PuKe('10'),
      new app.PuKe('A'),
      new app.PuKe('A'),
      new app.PuKe('A'),
      new app.PuKe('A')
    ];
    listDizhu = this.resetListSelected(listDizhu);
    listFamer = this.resetListSelected(listFamer);
    this.setData({
      hasFinish: false,
      lastPlay: new PlayModel('dizhu', null),
      dizhu: listDizhu,
      famer: listFamer
    });
    this.modifyPosition();
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.doReSet();
  },
  modifyPosition: function () {
    app.modifyPosition(this.data.dizhu, true);
    app.modifyPosition(this.data.famer, false);
    this.setData({ dizhu: this.data.dizhu });
    this.setData({ famer: this.data.famer });
    this.refreshButton();
  }
  ,
  doPass: function (e) {
    var player = e.currentTarget.dataset.player;
    var list;
    if (player == 'famer') {
      list = this.data.famer;
    }
    if (player == 'dizhu') {
      list = this.data.dizhu;
    }
    list = this.resetListSelected(list);
    var form = {};
    form[player] = list;
    form['lastPlay'] = new PlayModel(player, null);
    this.setData(form);
    this.modifyPosition();
  },
  doPlay: function (e) {
    var player = e.currentTarget.dataset.player;
    var list;
    if (player == 'famer') {
      list = this.data.famer;
    }
    if (player == 'dizhu') {
      list = this.data.dizhu;
    }

    // console.log(util.isOk());
    var listSelected = this.getSelectedPuke(list);
    var listUnSelected = this.getUnSelectedPuke(list);
    var isWiner = this.listIsEmpty(listUnSelected);
    listUnSelected = this.resetListSelected(listUnSelected);
    var form = {};
    form[player] = listUnSelected;
    this.setData(form);
    this.setData({
      hasFinish: isWiner,
      notice: isWiner ? '游戏结束 '  + (player == 'famer' ? '农民' : '地主') + '赢了' : this.data.notice,
      lastPlay: new PlayModel(player, listSelected)
    });
    this.modifyPosition();
  }
  ,
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