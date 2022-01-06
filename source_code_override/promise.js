/*
 * @Author: xiangfu.wu
 * @Date: 2022-01-05 11:43:06
 * @Description: 🚀
 * @FilePath: /code_notes/source_code_override/promise.js
 */


class MyPromise {
  /**
   * @description: 手写Promise.all方法
   * 所有promise的状态都是fulfilled才会正常进入fulfilled
   * 只有有一个promise的状态是rejected就进入reject并且返回当前错误
   */  
  static all(promises) {
    return new Promise((rs, rj) => {
      let count = 0;  //计数器
      const len = promises.length;
      const results = [];   //结果list
      promises.forEach((promise, index) => {
        let safePromise = Promise.resolve(promise); //传入值不一定是promise对象，做一个强转。
        safePromise.then(res => {
          //如果当前promise是fulfilled状态则将计数器加一
          count++;
          // results.push(res);  //直接推入的话顺序会错乱
          results[index] = res;  //直接插值才是OK的喔
          if(count == len) {
            //如果所有promise都是fulfilled状态，则最后回来的那个promise回调中一定会检测到 count == len，此时满足所有promise都fulfilled的条件，执行回调
            rs(results);
          }
        }).catch(err => {
          // 只要遇到错误就直接抛出
          rj(err);
        })
      });
    });
  }

/**
 * @description: 手写Promise.allSettled方法
 * 所有promise都有结果（不为pending状态）后返回整体结果
 */  

  static allSettled(promises) {
    return new Promise((rs, rj) => {
      let count = 0,
          len = promises.length,
          result = [];
      promises.forEach((promise, index) => {
        Promise.resolve(promise).then(res => {
          count++;
          result[index] = {
            status: 'fulfilled',
            value: res
          }
          if(count === len) {
            rs(result);
          }
        }).catch(err => {
          count++;
          result[index] = {
            status: 'rejected',
            reason: err
          }
          if(count === len) {
            rs(result);
          }
        })
      })
    })
  }

}

let p1 = Promise.resolve(1);
let p2 = new Promise((rs, rj) => {
  setTimeout(rs, 3000, 2);
})
let p3 = new Promise((rs, rj) => {
  setTimeout(rj, 2000, 'err3');
})

MyPromise.all([p1, p2, p3, 53])
  .then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });

// err3

MyPromise.all([p1, p2, 53])
  .then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });

// [1, 2, 53]


MyPromise.allSettled([p1, p2, p3, 53])
  .then(res => {
    console.log(res);
  })

// [
//   {
//       "status": "fulfilled",
//       "value": 1
//   },
//   {
//       "status": "fulfilled",
//       "value": 2
//   },
//   {
//       "status": "rejected",
//       "reason": "err3"
//   },
//   {
//       "status": "fulfilled",
//       "value": 53
//   }
// ]