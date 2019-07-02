if ( process.env.NODE_ENV === 'development' ) {
  console.log('jacksonx');
}

import { say, name } from './util.js';

import('./util').then((module) => {
  return module;
});

console.log(util);

const html = require('./index.html');


say();
console.log(name);

let a = 1;
console.log(a);

class Person {
  constructor() {
    console.log(1123);
  }
};

async function test() {
  const res = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('done');
    })
  });
  console.log(res);
}

test();

console.log([1, 2, 3].includes(3));
