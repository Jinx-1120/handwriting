/*
 * @Author: Jhaidi
 * @Date: 2021-03-01 15:54:24
 * @LastEditors: Jhaidi
 * @Description: 节流函数
 */
/**
 * @description: 节流函数 函数按照给定时间间隔执行，限制函数调频度
 * @sence scroll、元素拖拽、键盘事件
 * @param {*} fn
 * @param {*} delay
 * @return {*} fn
 */
// 首调用 立即执行
// function throttle(fn, delay) {
//   let context, args
//   let last = 0
//   return function() {
//     const now = + new Date()
//     context = this
//     args = arguments
//     if (now - last > delay) {
//       fn.call(context, args)
//       last = now
//     }
//   }
// }
// 尾调用 基于定时器
// function throttle(fn, delay) {
//   let timer, context, args
//   return function() {
//     context = this
//     args = arguments
//     if (!timer) {
//       setTimeout(() => {
//         timer = null
//         fn.call(context, args)
//       }, delay)
//     }
//   }
// }
// 两者结合 可以首调用 也会触发尾调用
function throttle(fn, delay) {
  let timer, context, args
  let lastTime = 0

  const throttled = function() {
    const now = + new Date()
    // 下次触发 fn时间
    const remaining = delay - (now - lastTime)
    context = this
    args = arguments
    // 如果没有剩余的时间了  或者你改了系统时间
    if (remaining <= 0 || remaining > delay) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      lastTime = now
      fn.call(context, args)
    } else if (!timer) {
      timer = setTimeout(() => {
        lastTime = now
        timer = null
        fn.call(context, args)
      }, remaining)
    }
  }
  throttled.cancel = function() {
    clearTimeout(timer)
    lastTime = 0
    timer = null
  }
}
