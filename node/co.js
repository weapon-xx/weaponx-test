const co = require('co');
co(function* (){
  yield new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('任务1');
      resolve('任务1')
    },1000)
  });

  yield new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('任务2');
      resolve('任务2')
    },1000)
  });
}).catch((err) => {
  console.log(err);
})
