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


co(function* () {
  let res = [
    new Promise(resolve => {
      setTimeout(() => {
        resolve(1)
      }, 1000)
    }).then(data => {
      return data
    }),
    new Promise(resolve => {
      setTimeout(() => {
        resolve(2)
      }, 1800)
    }).then(data => {
      return data
    }),
    new Promise(resolve => {
      setTimeout(() => {
        resolve(3)
      }, 1500)
    }).then(data => {
      return data
    })
  ]
  return res
}).then(data => {
  data.forEach(func => {
    func.then(data => {
      console.log(data)
    })
  })
})


const fn = co.wrap(function*() {
  return yield new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 1500)
  }).then(data => {
    return data
  })
})

fn().then(data => {
  console.log('wrap: ' + data);
})
