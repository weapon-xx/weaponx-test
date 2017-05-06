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

const rq = async () => {
  console.log(1)

  var data = await ajax().then(data => {
    return data
  })

  console.log(data)

  console.log(2)
  return 'done'
}

rq()
