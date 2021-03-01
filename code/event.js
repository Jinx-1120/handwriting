/*
 * @Author: Jhaidi
 * @Date: 2021-03-01 19:54:04
 * @LastEditors: Jhaidi
 * @Description: 发布与订阅
 */

const Event = function() {
  this.content = {}
}

Event.prototype.listen = function (eventType, fn) {
  if (!this.content[eventType]) {
    this.content[eventType] = []
  }
  this.content[eventType].push(fn)
}

Event.prototype.trigger = function () {
  const key = Array.prototype.shift.call(arguments)
  const fns = this.content[key]
  if (!fns || fns.length === 0) return

  fns.forEach(fn => {
    fn.call(this, arguments)
  })
}

Event.prototype.remove = function(eventType, fn) {
  const fns = this.content[eventType]
  if (!fns) return
  // 不存在fn函数 删除当前对应type下的所有回调函数
  if (!fn) {
    fns && (fns.length = 0)
  } else {
    const findIndex = fns.findIndex(callback => callback === fn)
    if (findIndex >= 0) fns.splice(findIndex, 1)
  }
}
