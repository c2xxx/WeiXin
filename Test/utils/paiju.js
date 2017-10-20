/*
所有牌局
*/
var PaiJu = function (id, dizhu, famer, firstPlayer, image, ruleType, ruleTxt) {
  this.id = id;//每局唯一标识
  this.dizhu = dizhu;//地主牌
  this.famer = famer;//农民牌
  this.firstPlayer = firstPlayer;//谁先出
  this.ruleType = ruleType;
  if (!('' + image).startsWith('http')) {
    image = 'http://oxwr9u8nc.bkt.clouddn.com/' + image;
  }
  if (ruleTxt) {
    this.ruleText = ruleTxt;
  } else if (ruleType == 'A') {
    this.ruleText = '斗地主双方明牌，规则是可以炸，可以三个不带，可以三带一，但不能三带二，可以四带二，也可以出顺子，农民先出牌，请问农民怎么才能赢？';
  } else if (ruleType == 'B') {
    this.ruleText = '斗地主双方明牌，规则是可以炸，可以出三个，不能三带一，不能三带二，可以四带二，也可以出顺子，农民先出牌，请问农民怎么才能赢？';
  }
  this.image = image;//图片 
}

var game01 = function () {
  var id = 'game01';
  var dizhu = ['9', '9', '9', 'J', 'J', '小王', '大王'];
  var famer = ['3', '3', '3', '3', '4', '5', '6', '7', '10', '10', 'A', 'A', 'A', 'A'];
  var firstPlayer = 'famer';//谁先出
  var imgName = 'game_05.jpg';
  var ruleType = 'A';
  return new PaiJu(id, dizhu, famer, firstPlayer, imgName, ruleType);
}
var game02 = function () {
  var id = 'game02';
  var dizhu = ['A', 'A', '9'];
  var famer = ['2', '3', '5', '5', '4', '7', '7', '10', '10', 'Q', 'Q'];
  var firstPlayer = 'famer';//谁先出
  var imgName = 'game_02.jpg';
  var ruleType = 'A';
  var ruleText = '斗地主双方明牌，农民先出牌，请问农民怎么才能赢？';
  return new PaiJu(id, dizhu, famer, firstPlayer, imgName, ruleType, ruleText);
}
var game03 = function () {
  var id = 'game03';
  var dizhu = ['A', 'A', 'J', 'J'];
  var famer = ['6', '6', '8', '8', '10', '10', '7', '10', '10', 'Q', 'Q', 'Q', 'K', 'K', 'K', '小王'];
  var firstPlayer = 'famer';//谁先出
  var imgName = 'game_01.jpg';
  var ruleType = 'B';
  return new PaiJu(id, dizhu, famer, firstPlayer, imgName, ruleType);
}
var game04 = function () {
  var id = 'game04';
  var dizhu = ['Q', 'K', '2', '2', '2', '小王'];
  var famer = ['5', '5', '5', '7', '8', 'A', '大王'];
  var firstPlayer = 'famer';//谁先出
  var imgName = 'game_03.jpg';
  var ruleType = 'A';
  return new PaiJu(id, dizhu, famer, firstPlayer, imgName, ruleType);
}
var game05 = function () {
  var id = 'game04';
  var dizhu = ['Q', 'K', '2', '2', '2', '小王'];
  var famer = ['5', '5', '5', '7', '8', 'A', '大王'];
  var firstPlayer = 'famer';//谁先出
  var imgName = 'game_03.jpg';
  var ruleType = 'A';
  return new PaiJu(id, dizhu, famer, firstPlayer, imgName, ruleType);
}

/*
随机获取一个游戏
*/
var randomGame = function () {
  var all = allGame();
  var randomIndex = Math.floor(Math.random() * all.length);
  return all[randomIndex];
}
/*
根据ID获取一个游戏
*/
var loadGameById = function (id) {
  var all = allGame();
  for (var i = 0, len = all.length; i < len; i++) {
    var game = all[i];
    if (game.id == id) {
      return game;
    }
  }
  return null;
}
/*
全部游戏
*/
var allGame = function () {
  var all = [game01(), game02(), game03(), game04()];
  return all;
}
/*
全部游戏,乱序
*/
var allGameRandomOrder = function () {
  var all = allGame();
  all.sort(function () { return 0.5 - Math.random() })
  return all;
}

module.exports = {
  game01: game01,
  game02: game02,
  allGame: allGame,
  allGameRandomOrder: allGameRandomOrder,
  loadGameById: loadGameById,
  randomGame: randomGame
}