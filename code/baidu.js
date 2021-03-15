/*
 * @Author: Jhaidi
 * @Date: 2021-03-12 15:19:38
 * @LastEditors: Jhaidi
 * @Description: file description
 */
// 数据类型判断
function getType(obj) {
  const type = typeof obj

  if (type !== 'object') {
    return type
  }

  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)]$/, '$1').toLowerCase()
}

/**
 * @description: 深拷贝
 * @param {*} obj
 * @return {*}
 */
const isComplexDateType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj
function deepClone(obj, hash = new WeakMap()) {
  if (obj.constructor === Date) {
    return new Date(obj)
  }

  if (obj.constructor === RegExp) {
    return new RegExp(obj)
  }
  if (hash.has(obj)) return has.get(obj)

  let allDes = Object.getOwnPropertyDescriptor(obj)
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDes)

  hash.set(obj, cloneObj)

  for (const key of Reflect.ownKeys(obj)) {
    cloneObj[key] = isComplexDateType(obj[key]) && typeof obj[key] !== 'function' ? deepClone(obj[key], hash) : obj[key]
  }
  return cloneObj
}

function queryToSring (obj) {
  // let str = '?'
  // for (const key in obj) {
  //   str += `&${key}=${obj[key]}`
  // }
  // return str
  if (typeof obj !== 'object' || obj === null) {
    return TypeError('错误的类型')
  }
  return '?' + Object.keys(obj).reduce((c, n) => `${c ? c + '&' : c}${n}=${obj[n]}`, '')
}
/**
 * @description: 查找字符串中出现次数最多的字母
 * @param {*} str
 * @return {*}
 */
function findMaxChar(str = '') {
  const obj = {}
  let key = '', max = 0
  for (const i of str) {
    if (obj[i]) {
      obj[i] ++
      if (obj[i] > max) {
        key = i
        max = obj[i]
      } else if (obj[i] === max) {
        if (Array.isArray(key) && !key.includes(i)) {
          key = [...key, i]
        } else {
          key = [key, i]
        }
      }
    } else {
      obj[i] = max = 1
      key = i
    }
  }
  return {
    obj,
    key,
    max
  }
}

/**
 * @description: promise 封装XMLHttpRequest
 * @param {*} url
 * @param {*} method
 * @param {*} options
 * @return {*}
 */
function ajaxPromise(url, method = 'get', options = {}) {
  const currentMethod = method.toUpperCase()
  const { params, data, headers } = options
  return new Promise(function (reslove, reject) {

    const xhr = new XMLHttpRequest()
    if (params) {
      const queryUrl = url + queryToSring(params)
    }
    xhr.open(currentMethod, queryUrl, true)
    if (headers) {
      Object.keys(headers).forEach(header => {
        xhr.setRequestHeader(header, headers[header])
      })
    }
    
    xhr.send(data ? data: null)

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        reslove(xhr.responseText)
      } else {
        reject(xhr)
      }
    }
  })
}




