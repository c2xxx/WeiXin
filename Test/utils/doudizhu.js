/*
1、校验出牌的合法性
2、比较两组牌的大小
*/

/*
出牌的分类：
0过牌，没有出牌
-1非法的类型，出牌不符合规则
1炸弹：王炸/4张一样的=2或4
2单牌（1张）=1
3对子（2张一样的）=2
4四带2：4张一样的+2张任意=6
5三带一:（3张一样的+1）=4
6三个不带:（3张一样的）=3

7顺子：单牌连续，1*n,5张以上，不含2和大小王=n
8连对:（2张一样的，连续）*n=2n
9飞机带1个：（3张一样的，连续）*n+n=4n
10飞机不带：（3张一样的，连续）*n=3n
*/

var PaiCategory = function () {
  this.type = 1;//类型
  this.start = 3;//开始牌值（连队、顺子、飞机的第一个牌值）
  this.length = 1;//长度，连队、顺子、飞机的长度
}
//是否为中文
function isOk() {
  return 29;
}

//牌是否可以出
function canPlay(list) {
  return false;
}


module.exports = {
  isOk: isOk
}