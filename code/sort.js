/*
 * @Author: Jhaidi
 * @Date: 2021-03-14 10:27:53
 * @LastEditors: Jhaidi
 * @Description: file description
 */
/**
 * O(n^2)
 * @description: 冒泡排序 
 * @param {*} arr
 * @return {*}
 */
function bubbleStort(arr = []) {
  const len = arr.length
  if (len < 2) return arr
  for (let i = 0; i < len; i++) {
    
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[i]) {
        const temp = arr[j]
        arr[j] = arr[i]
        arr[i] = temp
      }
    }
  }
  return arr
}
/**
 * O(nlogn)
 * @description: 快速排序，查找一个数组中间值，然后循环对比，当前值与确定的数组中间值的大小
 * 大的放左边小的放右边，递归执行
 * @param {*} arr
 * @return {*}
 */
function quickSort(arr = []) {
  if (arr.length < 2) return arr

  const pivotIndex = Math.floor(arr.length / 2)
  const pivot = arr.splice(pivotIndex, 1)
  const left = [], right = []
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([pivot], quickSort(right))
}
/**
 * O(n^2)
 * @description: 插入排序，循环保留当前值和当前循环的前一个下标，循环判断当前值与下标标记的值的大小
 * 如果当前值小于下标对应的值，将数值进行对换，下标递减，否则将保留的当前值给下标对应的下一个值
 * @param {*} arr
 * @return {*}
 */
function insertSort(arr = []) {
  const len = arr.length
  let preIndex, current
  for (let i = 1; i < len; i++) {
    preIndex = i -1
    current = arr[i]
    while(preIndex >= 0 && current < arr[preIndex]) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex --
    }
    arr[preIndex + 1] = current
  }
  return arr
}
/**
 * O(n^2)
 * @description: 选择排序，将最小的元素放在最前面，然后查询剩余的数据中的最小的元素
 * 放在一排序的元素的后面
 * @param {*} array
 * @return {*}
 */
function selectSort(array = []) {
  const len = array.length
  let temp, minIndex
  for (let i = 0; i < len; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (array[j] <= array[minIndex]) {
        minIndex = j
      }
    }
    temp = array[i]
    array[i] = array[minIndex]
    array[minIndex] = temp
  }
  return arr
}

/**
 * O(nlogn)
 * @description: 归并排序，
 * 把长度为n的输入序列分成两个长度为n/2的子序列；
 * 对这两个子序列分别采用归并排序；
 * 将两个排序好的子序列合并成一个最终的排序序列。
 * @param {*} array
 * @return {*}
 */
function mergeSort(array = []) {

  const len = array.length
  if (len < 2) return array

  const middle = Math.floor(len / 2),
  left = array.slice(0, middle),
  right = array.slice(middle)

  function merge(l, r) {
    const result = []
    while(l.length > 0 && r.length> 0) {
      if (l[0] >= r[0]) {
        result.push(r.shift())
      } else {
        result.push(l.shift())
      }
    }
    while(l.length) {
      result.push(l.shift())
    }
    while(r.length) {
      result.push(r.shift())
    }
    return result
  }

  return merge(mergeSort(left), mergeSort(right))
}
