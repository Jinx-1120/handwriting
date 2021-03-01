/*
 * @Author: Jhaidi
 * @Date: 2021-03-01 12:16:13
 * @LastEditors: Jhaidi
 * @Description: 手写promise
 */

const isFunction = obj => typeof obj === 'function'
const isObject = obj => typeof obj === 'object' && !!obj
const isPromise = promise => promise instanceof myPromise


const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function myPromise(fn) {
  const context = this
  this.status = PENDING
  this.value = null
  this.error = null
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []
  function resolve(val) {
    if (isPromise(val)) {
      return val.then(resolve, reject)
    }
    if (context.status === PENDING) {
      setTimeout(() => {
        context.status = FULFILLED
        context.value = val
        context.onFulfilledCallbacks.forEach((callback) => callback(context.value))
      }, 0)
    }
  }
  function reject(e) {
    if (context.status === PENDING ) {
      setTimeout(function() {
        context.status = REJECTED
        context.error = e
        context.onRejectedCallbacks.forEach((callback) => callback(context.error))
      }, 0)
    }
  }
  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
myPromise.prototype.then = function(onFulfilled, onRejected) {
  const context = this
  let bridgePromise
  onFulfilled = isFunction(onFulfilled) ? onFulfilled : value => value
  onRejected = isFunction(onRejected) ? onRejected : error => { throw error }
  if (context.status === FULFILLED) {
    return bridgePromise = new myPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onFulfilled(context.value)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }
  if (context.status === REJECTED) {
    return bridgePromise = new myPromise((resolve, reject) => {
      setTimeout(() => {
        try {
          let x = onRejected(context.error)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      }, 0)
    })
  }
  if (context.status === PENDING) {
    return bridgePromise = new myPromise((resolve, reject) => {
      context.onFulfilledCallbacks.push((value) => {
        try {
          let x = onFulfilled(value)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
      context.onRejectedCallbacks.push((error) => {
        try {
          let x = onRejected(error)
          resolvePromise(bridgePromise, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

function resolvePromise(bridgePromise, x, resolve, reject) {
  if (bridgePromise === x) {
    return reject(new TypeError('循环引用'))
  }
  let called = false
  if (isPromise(x)) {
    if (x.status === PENDING) {
      x.then(res => {
        resolvePromise(bridgePromise, res, resolve, reject)
      }, err => {
        reject(err)
      })
    } else {
      x.then(resolve, reject)
    }
  } else if (x != null && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      let then = x.then
      if (isFunction(then)) {
        then.call(x, res => {
          if (called) return
          called = true
          resolvePromise(bridgePromise, res, resolve, reject)
        }, err => {
          if (called) return
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}
myPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}
myPromise.prototype.all = function(promises = []) {
  return new myPromise((resolve, reject) => {
    let count = 0
    const len = promises.length
    let values = new Array(len)
    promises.forEach((promise, index) => {
      myPromise.resolve(promise).then(res => {
        values[index] = res
        count ++
        count === len && resolve(values)
      }).catch(e => reject(e))
    })
  })
}

myPromise.prototype.race = function (promises = []) {
  return new myPromise((resolve, reject) => {
    promises.forEach(promise => {
      myPromise.resolve(promise).then(resolve, reject)
    })
  })
}
myPromise.defer = myPromise.deferred = function () {
  let dfd = {}
  dfd.promise = new myPromise((resolve,reject)=>{
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = myPromise

