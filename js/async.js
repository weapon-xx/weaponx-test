function ajax () {
  return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('test')
      }, 2000)
  })
}

async function rq() {
  console.log(1)

  var data = await ajax()

  console.log(data)

  setTimeout(() => {
    console.log('setTimeout')
  }, 100)
  console.log(2)

}

rq()

console.log('next')

function addNumAfter2s(num) {
  return new Promise((resolve, rejcet) => {
    setTimeout(resolve(num), 2e3);
  })
}

async function add() {
  let num = await addNumAfter2s(10);
  console.log(num);
}

// add();
