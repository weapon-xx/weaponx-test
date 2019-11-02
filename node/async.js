async function f() {
  return 'hello world';
}

f().then(v => console.log(v))

const test = require('../node_modules/npm-test-xx/index')

test()


// mark
async function async1() {
  console.log(9);
  setTimeout(() => {
      console.log(10);
      new Promise((resolve) => {
          console.log(1);
          resolve();
      }).then(() => {
          console.log(2);
      })
  })
}

async function async2() {
  async1();
  new Promise((resolve) => {
      console.log(6);
      setTimeout(() => {
          console.log(11);
      })
      resolve();
  }).then(() => {
      console.log(5);
  })
}

console.log(8);

async function async3() {
  await async2();
  console.log(4);
  new Promise((resolve) => {
      console.log(3);
      resolve();
  }).then(() => {
      console.log(7);
  })
}

console.log(12);
async3()