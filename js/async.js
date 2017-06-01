function ajax () {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('test')
      }, 2000)
  })
}

// ajax().then((data) => {
//   console.log(data)
// })

async function rq() {
  console.log(1)

  var data = await ajax().then(data => {
    return data
  })

  console.log(data)

  console.log(2)
  return 'done'
}

console.log(rq())

console.log('next')
