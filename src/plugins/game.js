/* 重要备注：
imgOrigArr 和 imgRanfArr这两个数组分别存放正确顺序排列和乱序排列的碎片信息
数组结构：arr[碎片节点下标] = 碎片显示位置
*/

/**
 * [puzzleGame 向puzzleGame对象中添加属性]
 */
// import $ from 'jQuery'
var $ = require('jquery')
var puzzleGame = function (param) {
  /** *********** 参数处理 ******************/
  this.img = param.img || ''// 待操作的图片

  /** *********** 节点 ******************/
  this.imgArea = $('#wrap #imgArea')// 图片显示区域

  this.imgCells = ''// 用于记录碎片节点的变量

  /** *********** 变量 ******************/
  this.imgOrigArr = []// 图片拆分后，存储正确排序的数组
  this.imgRandArr = []// 图片打乱顺序后，存储当前排序的数组

  this.levelArr = param.levelArr// 存储难度等级的数组
  this.levelNow = param.level || 0// 表示当前难度等级的变量，与难度数组结合使用

  // 图片整体的宽高
  this.imgWidth = parseInt(this.imgArea.css('width'))
  this.imgHeight = parseInt(this.imgArea.css('height'))
  // 拆分为碎片后，每一块碎片的宽高
  this.cellWidth = this.imgWidth / this.levelArr[this.levelNow][1]
  this.cellHeight = this.imgHeight / this.levelArr[this.levelNow][0]

  this.hasStart = 0// 记录有是否开始的变量，默认0，未开始
  this.moveTime = 400// 记录animate动画的运动时间，默认400毫秒

  this.suc = param.suc
  // 调用初始化函数，拆分图片,绑定按钮功能
  // this.init()
}
/**
 * [prototype 在puzzleGame对象中添加方法，用json格式表示]
 */
puzzleGame.prototype = {
  /**
   * [init 初始化特效设置]
   * @return [无]
   */
  init: function () {
    this.imgSplit()
    this.gameState()
  },

  /**
   * [imgSplit 将图片拆分为碎片]
   */
  imgSplit: function () {
    this.imgOrigArr = []// 清空正确排序的数组

    // 必须清空图片区域的碎片代码，否则每一次拆分图片是与之前拆分的累积
    // 例如第一次拆分3x3,插入了9个div，但没有清空，第二次拆分4x4，此时是在前9个div之后再插入14个div，共9+16个div
    this.imgArea.html('')

    var cell = ''// 记录单个图片碎片的变量
    for (var i = 0; i < this.levelArr[this.levelNow][0]; i++) {
      for (var j = 0; j < this.levelArr[this.levelNow][1]; j++) {
        // 将碎片所属div的下标存入数组，用于最终校验是否排序完成
        this.imgOrigArr.push(i * this.levelArr[this.levelNow][1] + j)

        cell = document.createElement('div')
        cell.className = 'imgCell'
        $(cell).css({
          'width': (this.cellWidth - 2) + 'px',
          'height': (this.cellHeight - 2) + 'px',
          'left': j * this.cellWidth + 'px',
          'top': i * this.cellHeight + 'px',
          'background': "url('" + this.img + "')",
          'backgroundPosition': (-j) * this.cellWidth + 'px ' + (-i) * this.cellHeight + 'px'
        })
        this.imgArea.append(cell)
      }
    }
    this.imgCells = $('#wrap #imgArea div.imgCell')// 碎片节点
  },
  /**
   * [gameStart 开始/回复 游戏的函数]
   */
  gameState: function () {
    var self = this
    // 开始游戏后部分值、样式设置
    if (self.hasStart === 0) {
      self.hasStart = 1
      // 打乱图片
      self.randomArr()
      self.cellOrder(self.imgRandArr)
      // 图片事件
      self.imgCells.unbind('touchstart').bind('touchstart', function (e) {
        /* 此处是图片移动 */
        // 所选图片碎片的下标以及鼠标相对该碎片的位置
        var cellIndex1 = $(this).index()
        var cellmousex = e.targetTouches[0].pageX - self.imgCells.eq(cellIndex1).offset().left
        var cellmousey = e.targetTouches[0].pageY - self.imgCells.eq(cellIndex1).offset().top

        $(document).unbind('touchmove').bind('touchmove', function (e2) {
          self.imgCells.eq(cellIndex1).css({
            'z-index': '40',
            'left': (e2.targetTouches[0].pageX - cellmousex - self.imgArea.offset().left) + 'px',
            'top': (e2.targetTouches[0].pageY - cellmousey - self.imgArea.offset().top) + 'px'
          })
          e2.preventDefault()
        }).unbind('touchend').bind('touchend', function (e3) {
          // 被交换的碎片下标
          var cellIndex2 = self.cellChangeIndex((e3.changedTouches[0].pageX - self.imgArea.offset().left), (e3.changedTouches[0].pageY - self.imgArea.offset().top), cellIndex1)
          // 碎片交换
          if (cellIndex1 === cellIndex2) {
            self.cellReturn(cellIndex1)
          } else {
            self.cellExchange(cellIndex1, cellIndex2)
          }
          e3.preventDefault()
          // 移除绑定
          $(document).unbind('touchmove').unbind('touchend')
        })
        e.preventDefault()
      })
    } else if (self.hasStart === 1) {
      alert('已经在游戏中！')
    }
  },
  /**
   * [randomArr 生成不重复的随机数组的函数]
   */
  randomArr: function () {
    // 清空数组
    this.imgRandArr = []

    var order// 记录随机数，记录图片放置在什么位置
    for (var i = 0, len = this.imgOrigArr.length; i < len; i++) {
      order = Math.floor(Math.random() * len)
      if (this.imgRandArr.length > 0) {
        while ($.inArray(order, this.imgRandArr) > -1) {
          order = Math.floor(Math.random() * len)
        }
      }
      this.imgRandArr.push(order)
    }
  },

  /**
   * [cellOrder 根据数组给图片排序的函数]
   */
  cellOrder: function (arr) {
    for (var i = 0, len = arr.length; i < len; i++) {
      this.imgCells.eq(i).animate({
        'left': arr[i] % this.levelArr[this.levelNow][1] * this.cellWidth + 'px',
        'top': Math.floor(arr[i] / this.levelArr[this.levelNow][0]) * this.cellHeight + 'px'
      }, this.moveTime)
    }
  },

  /**
   * [cellChangeIndex 通过坐标，计算被交换的碎片下标]
   */
  cellChangeIndex: function (x, y, orig) {
    // 鼠标拖动碎片移至大图片外
    if (x < 0 || x > this.imgWidth || y < 0 || y > this.imgHeight) {
      return orig
    }
    // 鼠标拖动碎片在大图范围内移动
    var row = Math.floor(y / this.cellHeight)
    var col = Math.floor(x / this.cellWidth)
    var location = row * this.levelArr[this.levelNow][1] + col
    var i = 0
    var len = this.imgRandArr.length
    while ((i < len) && (this.imgRandArr[i] !== location)) {
      i++
    }
    return i
  },

  /**
   * [cellExchange 两块图片碎片进行交换]
   */
  cellExchange: function (from, to) {
    var self = this
    // 被拖动图片、被交换图片所在行、列
    var rowFrom = Math.floor(this.imgRandArr[from] / this.levelArr[this.levelNow][1])
    var colFrom = this.imgRandArr[from] % this.levelArr[this.levelNow][1]
    var rowTo = Math.floor(this.imgRandArr[to] / this.levelArr[this.levelNow][1])
    var colTo = this.imgRandArr[to] % this.levelArr[this.levelNow][1]

    var temp = this.imgRandArr[from]// 被拖动图片下标，临时存储

    // 被拖动图片变换位置
    this.imgCells.eq(from).animate({
      'top': rowTo * this.cellHeight + 'px',
      'left': colTo * this.cellWidth + 'px'
    }, this.moveTime, function () {
      $(this).css('z-index', '10')
    })
    // 表交换图片变换位置
    this.imgCells.eq(to).css('z-index', '30').animate({
      'top': rowFrom * this.cellHeight + 'px',
      'left': colFrom * this.cellWidth + 'px'
    }, this.moveTime, function () {
      $(this).css('z-index', '10')

      // 两块图片交换存储数据
      self.imgRandArr[from] = self.imgRandArr[to]
      self.imgRandArr[to] = temp

      // 判断是否完成全部移动，可以结束游戏
      if (self.checkPass(self.imgOrigArr, self.imgRandArr)) {
        self.success()
      }
    })
  },

  /**
   * [cellReturn 被拖动图片返回原位置的函数]
   */
  cellReturn: function (index) {
    var row = Math.floor(this.imgRandArr[index] / this.levelArr[this.levelNow][1])
    var col = this.imgRandArr[index] % this.levelArr[this.levelNow][1]

    this.imgCells.eq(index).animate({
      'top': row * this.cellHeight + 'px',
      'left': col * this.cellWidth + 'px'
    }, this.moveTime, function () {
      $(this).css('z-index', '10')
    })
  },

  /**
   * [checkPass 判断游戏是否成功的函数]
   */
  checkPass: function (rightArr, puzzleArr) {
    if (rightArr.toString() === puzzleArr.toString()) {
      return true
    }
    return false
  },

  /**
   * [success 成功完成游戏后的处理函数]
   */
  success: function () {
    this.imgCells.unbind('touchstart').unbind('touchmove').unbind('touchend')
    this.hasStart = 0
    // alert('恭喜您，成功完成本次游戏！')
    this.suc()
  }
}

export default puzzleGame
