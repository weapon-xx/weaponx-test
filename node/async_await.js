// (async function(){
//   const commitMsg = '...';
//
//   await setTimeout(()=>{
//     console.log('任务1');
//   },1000);
//
//   await console.log(222)
//
//   console.log(333)
// })();
//
//
// console.log(111);

function resolveAfter2Seconds(x) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  }).catch(result => {
    console.log(`reject: ${result}`)
  });
};

async function add1(x) {
  console.log(1);
  var a = await resolveAfter2Seconds(20);
  console.log(`a: ${a}`);
  console.log(2);
}

// add1(10);
function test() {
  add1(10);
  console.log('test')
}

test();
