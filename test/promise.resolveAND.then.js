/*
 * @Author: xiangfu.wu
 * @Date: 2022-01-05 17:43:04
 * @Description: 🚀
 * @FilePath: /code_notes/test/promise.resolveAND.then.js
 */

/**
 *  1. 在.then中return的promise对象或其他值都支持继续.then
 */
let obj = new Promise((rs, rj) => {
  setTimeout(_ => {
    rs(0)
  }, 3000);
}).then(res => {
  console.log(res);
  console.log(obj);
  // return new Promise((rs, rj) => {
  //   setTimeout(_ => {
  //     rs(2222)
  //   }, 3000);
  // })
  return 54454
}).then(res => {
  console.log(res);
})

/**
 * @原理概述 做了判断，若回调返回值不是一个Promise对象
 * 就将其包装成Promise对象再return
 */
const then = (cb) => {
  // prevResult为上一个Promise对象resolve传过来的值。
  let res = cb(prevResult);
  // 兼容上一个回调返回值不是Promise对象的情况
  if(res instanceof Promise) {
    return res;
  } else {
    return Promise.resolve(res);
  }
}

/**
 * 2. Promise.resolve传入的promise对象或其他值也都支持.then
 */
let obj2 = new Promise((rs, rj) => {
  setTimeout(_ => {
    rs('aaaaaa')
  }, 2000);
})
Promise.resolve(1).then(res => console.log(res))
Promise.resolve(obj2).then(res => console.log(res))

/**
 * @原理概述 做了判断，如果是promise对象则可以直接返回，如果是普通值
 * 就再用promise包一层
 */
const resolve = (param) => {
  if(res instanceof Promise) {
    return param;
  } else {
    return new Promise((rs, rj) => {
      rs(param);
    })
  }
}
