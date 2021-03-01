/*
 * @Author: Jhaidi
 * @Date: 2021-03-01 19:09:02
 * @LastEditors: Jhaidi
 * @Description: 防抖函数
 */
/**
 * @description: 防抖函数: 一定时间段连续的函数调用，只让执行一次
 * @scene 主要应用场景input 发送请求，window resize
 * @param {*} fn 
 * @param {*} delay 防抖时间
 * @param {*} immediate 是否立即执行
 * @return {*} function
 */
function debounce(fn, delay, immediate = false) {
  let timer, result
  const debounce = function() {
    const context = this
    const args = arguments
    clearTimeout(timer)
    if (immediate) {
      const runNow = !timer
      timer = setTimeout(function() {
        timer = null
      }, delay)
      if (runNow) result = fn.call(context, args)
    } else {
      timer = setTimeout(function() {
        fn.call(context, args)
      }, delay)
    }
    return result
  }
  debounce.cancel = function () {
    clearTimeout(timer)
    timer = null
  }
  return debounce
}