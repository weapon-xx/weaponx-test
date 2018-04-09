import {say, name} from './util.js'

say()
console.log(name)

let a = 1;
console.log(a);

class Person {
  constructor() {
    console.log(1123);
  }
}

new Promise(resolve => {
  setTimeout(resolve, 1e3)
}).then(data => {
  console.log('done')
})

console.log([1, 2, 3].includes(3))
