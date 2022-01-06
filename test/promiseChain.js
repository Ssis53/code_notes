/*
 * @Author: xiangfu.wu
 * @Date: 2022-01-05 16:44:00
 * @Description: 🚀
 * @FilePath: /code_notes/test/promiseChain.js
 */

/**
 * 基于Promise微任务队列的链式调用
 */

function joinStr(old='', newS='') {
  return new Promise((resolve, reject) => {
    setTimeout(_ => {
      let result = old + newS;
      resolve(result)
      console.log('joinStr执行结果：', result);
    }, 2000)
  });
}

async function func() {
  let res1 = await joinStr('a', 'b');
  let res2 = await joinStr(res1, 'c');
  let res3 = await joinStr(res2, 'd');
  console.log(res3);
}

function func2() {
  let chain = Promise.resolve('1');
  chain = chain.then((res) => joinStr(res, '2'));
  chain = chain.then((res) => joinStr(res, '3'));
  chain = chain.then((res) => joinStr(res, '4'));
  chain.then(res => console.log(res));
}

func();
func2();
