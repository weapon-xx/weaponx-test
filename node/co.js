const co = require('co');
co(function* (){
  yield new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('任务1');
      resolve('任务1成功')
    },1000)
  }).then( data =>{
    console.log(data);
  });

  yield new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('任务2');
      resolve('任务2成功')
    },1000)
  }).then( data =>{
    console.log(data);
  });
}).catch((err) => {
  console.log(err);
})
