/*
 * @Author: Jhaidi
 * @Date: 2021-03-01 20:56:38
 * @LastEditors: Jhaidi
 * @Description: 继承进阶 new call apply bind
 */
/**
 * @description: new实现
 */
// new基本步骤
// 1. 创建一个新的对象
// 2. 将构造函数的作用域赋给新的对象 this指向
// 3. 执行构造函数内的代码
// 4. 返回新的对象
// 目的
// 1. 让实例可以访问到私有属性
// 2. 让实例可以访问到构造函数原型（constructor.prototype）所在原型链上的属性
// 3. 构造函数返回最后的结果是引用类型
function _new (ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw '构造函数必须是一个函数'
  }
  const instance = Object.create(ctor.prototype)

  const res = ctor.apply(instance, args)

  return (typeof res === 'object' && res !== null) ? res : instance
}
// 将函数设置为对象的属性，使用eval函数执行这个对象上面的函数
// 执行完删除这个属性
function _call(context, ...args) {
  const ctx = context || window
  ctx.fn = this
  const result = eval('ctc.fn(...args)')
  delete ctx.fn
  return result
}

function _apply(context, args) {
  const ctx = context || window
  ctx.fn = this
  const result = eval('ctx.fn(...args)')
  delete ctx.fn
  return result
}
// 核心在于返回一个函数，并且要保证原型链对象上属性不能丢失，所以这里使用Object.create()方法保存
function _bind(context, ...args) {

  const self = this
  const fbind = function () {
    self.apply(context instanceof self ? self : context, args.concat(Array.prototype.slice.call(arguments)))
  }
  if (this.prototype) {
    fbind.prototype = Object.create(this.prototype)
  }

  return fbind

}
