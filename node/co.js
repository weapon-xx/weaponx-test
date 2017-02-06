const co = require('co');
co(function* (){
  var msg
  yield task1().then( data =>{
    console.log(data)
    msg = data
  })

  yield task2(msg).then( data =>{
    console.log(data)
  });
}).catch((err) => {
  console.log(err)
})

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
