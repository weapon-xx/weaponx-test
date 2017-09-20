const co = require('co');
co(function* (){

  var msg = yield new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('任务1')
    },1000)
  }).then( data =>{
    console.log(data)
    return data
  })
  yield task2(msg).then( data =>{
    console.log(data)
  });
  return Promise.resolve(111);
}).then(json => {
  console.log(json)
}).catch((err) => {
  console.log(err)
})
console.log(2);


console.log(1)

function task1() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log('任务1')
      resolve('任务1成功')
    },1000)
  })
}

function task2(msg) {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      console.log(`任务1信息:${msg}`);
      console.log('任务2')
      resolve('任务2成功')
    },1000)
  })
}
