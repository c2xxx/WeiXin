/*
1、校验出牌的合法性
2、比较两组牌的大小
*/

/*
出牌的所有牌型：
没有连炸，三带一个或不带

0过牌，没有出牌
-1非法的类型，出牌不符合规则
1炸弹：王炸/4张一样的=2或4
2单牌（1张）=1 
3四带2：4张一样的+2张任意=6 

4顺子：单牌连续，1*n，n最小5，不含2和大小王=n
5连对:（2张一样的，连续）*n=2n，n最小1，即包括对子
6飞机带1个：（3张一样的，连续）*n+n=4n，n最小1
7飞机不带：（3张一样的，连续）*n=3n，n最小1
*/

var _id = 0;
/*
一张牌的基本类型
*/
var PuKe = function (name) {
  this.id = _id++;
  this.name = name;
  puKeInitHelper(this);
  this.width = '180rpx';
  this.height = '250rpx';
  this.marginTop = 0;
}

/*
初始化扑克牌基本属性
*/
var _value_sub_king = 20;
var _value_king = 21;
var puKeInitHelper = function (puke) {
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
}

var PlayType = function (type1, start, length) {
  this.type = type1;//类型
  this.start = start;//开始牌值（连队、顺子、飞机的第一个牌值）
  this.length = length;//长度，连队、顺子、飞机的长度 
  this.msg = '';//返回的附带消息 
}

function sortList(list) {
  list.sort(function (a, b) {
    return a.value - b.value
  });
}
//获取牌型
function getPlayType(list) {
  var playType = new PlayType();
  var isArray = Array.prototype.isPrototypeOf(list);
  //不是数组，直接返回错误
  if (!isArray) {
    playType.type = -1;
    playType.msg = '异常';
    return playType;
  }
  //升序排序
  sortList(list);
  var length = list.length;
  var ok = false;

  // 1炸弹：王炸 / 4张一样的= 2或4
  // 2单牌（1张）=1
  // 3四带2：4张一样的+ 2张任意= 6

  // 4顺子：单牌连续，1 * n，n最小5，不含2和大小王 = n
  // 5连对: （2张一样的，连续）*n=2n，n最小1，即包括对子
  // 6飞机带1个：（3张一样的，连续）*n + n=4n，n最小1
  // 7飞机不带：（3张一样的，连续）*n=3n，n最小1
  switch (length) {
    case 0:
      playType.type = 0;
      playType.msg = '过牌';
      break;
    default:
      //一定要先判断炸弹，4张牌一样算炸弹，不按三带一算，其他顺序随便，不会冲突
      ok = isZhaDan(list, playType);
      if (ok) break;

      ok = isDanPai(list, playType);
      if (ok) break;
      ok = is4And2(list, playType);
      if (ok) break;
      ok = isShunZi(list, playType);
      if (ok) break;
      ok = isLianDui(list, playType);
      if (ok) break;
      ok = isFlyAnd1(list, playType);
      if (ok) break;
      ok = isFlyAnd0(list, playType);
      if (ok) break;
      break
  }
  if (!ok) {
    playType.type = -1;
    playType.msg = '不符合规则';
  }
  return playType;
}

//1 炸弹：王炸/4张一样的=2或4
function isZhaDan(list, playType) {
  var length = list.length;
  var match = false;
  //4个一样或大小王
  if (length == 2) {
    match = (list[0].value == _value_sub_king) && (list[1].value == _value_king);
  }
  if (length == 4) {
    match = (list[0].value == list[3].value);
  }
  if (match) {
    playType.type = 1;
    playType.msg = '炸弹';
    playType.length = 1;
    playType.start = list[0].value;
  }
  return match;
}
//2 单牌（1张）=1
function isDanPai(list, playType) {
  var length = list.length;
  var match = false;
  if (length == 1) {
    match = true;
    playType.type = 2;
    playType.msg = '单牌';
    playType.length = 1;
    playType.start = list[0].value;
  }
  return match;
}
//3 四带2：4张一样的+2张任意=6
function is4And2(list, playType) {
  var length = list.length;
  var match = false;
  if (length == 6) {
    list = listSelect(list, 4);
    match = (list.length == 4);
  }
  if (match) {
    playType.type = 3;
    playType.msg = '四带二';
    playType.length = 1;
    playType.start = list[0].value;
  }
  return match;
}
//4顺子：单牌连续，1 * n，n最小5，不含2和大小王 = n
function isShunZi(list, playType) {
  var length = list.length;
}
//5连对: （2张一样的，连续）*n=2n，n最小1，即包括对子
function isLianDui(list, playType) {
  var length = list.length;
  var match = false;
  if (length % 2 == 0) {
    var pre;
    match = true;
    for (var i = 0; i < length; i++) {
      var value = list[i].value;
      if (i == 0) {
        pre = value;
        continue;
      }

      if (i % 2 == 0) {
        // value - pre == 1;要满足
        if (value - pre != 1) {
          match = false;
          break;
        }
      } else if (i % 2 == 1) {
        // value - pre == 0;要满足
        if (value - pre != 0) {
          match = false;
          break;
        }
      }

      if (i % 2 == 0) {
        pre = value;
      }

    }
  }

  if (match) {
    playType.type = 5;
    playType.msg = length == 2 ? '对子' : '连对';
    playType.length = length / 2;
    playType.start = list[0].value;
  }
  return match;
}
//6飞机带1个：（3张一样的，连续）*n + n=4n，n最小1
function isFlyAnd1(list, playType) {
  var length = list.length;
  var match = false;
  if (length % 4 == 0) {
    list = listSelect(list, 3);
    match = isFlyAnd0(list, playType);
    playType.type = 6;
    playType.msg = '飞机三带一';
    return match;
  }
  return match;
}
//7飞机不带：（3张一样的，连续）*n=3n，n最小1
function isFlyAnd0(list, playType) {
  var length = list.length;
  var match = false;
  if (length % 3 == 0) {
    list = listSelect(list, 3);

    var pre;
    match = true;
    for (var i = 0; i < length; i++) {
      var value = list[i].value;
      if (i == 0) {
        pre = value;
        continue;
      }

      if (i % 3 == 0) {
        // value - pre == 1;要满足
        if (value - pre != 1) {
          match = false;
          break;
        }
      } else if (i % 3 != 0) {
        // value - pre == 0;要满足
        if (value - pre != 0) {
          match = false;
          break;
        }
      }

      if (i % 3 == 0) {
        pre = value;
      }

    }
  }
  if (match) {
    playType.type = 7;
    playType.msg = '飞机不带';
    playType.length = list.length / 3;
    playType.start = list[0].value;
  }
  return match;
}

//散牌剔除

//筛选三带一,四带2的牌，n表示1张牌出现n次才保留，比如3，出现三次保留，其余的当作散牌剔除
function listSelect(list, n) {
  var length = list.length;
  var form = {};//统计每个元素出现的次数
  var formAll = {};//存储所有元素，键值格式：value + '_' + index
  for (var i = 0; i < length; i++) {
    var pai = list[i];
    var value = list[i].value;
    var key1 = '' + value;
    var pre = form[key1] ? form[key1] : 0;
    var index = pre;//第几个
    var key2 = value + '_' + index;
    form[key1] = pre + 1;
    formAll[key2] = pai;
  }
  var resultSet = [];//数量达标的集合
  for (var key in form) {//遍历json对象的每个key/value对,p为key
    var value = key;
    var count = form[key];
    if (count < n) {//数量不达标
      continue;
    }
    resultSet[resultSet.length] = value;
  }

  var result = [];//筛选后的合集
  var setLength = resultSet.length;
  for (var i = 0; i < setLength; i++) {
    var value = resultSet[i];
    for (var j = 0; j < n; j++) {
      var key2 = value + '_' + index;
      var pai = formAll[key2];
      result[result.length] = pai;
    }
  }
  // console.log('筛选前：')
  // console.log(list)
  // console.log('筛选后：')
  // console.log(result)
  return result;
}
function log(msg) {
  console.log('doudizhu_' + msg);
}


module.exports = {
  getPlayType: getPlayType,
  PuKe: PuKe
}