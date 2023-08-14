function compose(...fns) {
    let promise = Promise.resolve();
    for (let i = 0; i < fns.length; i++) {
        promise = promise.then(() => {
            return new Promise((resolve) => {
                fns[i](resolve);
            });
        });
    }
}

function foo(next) {
  setTimeout(() => {
    console.log('foo');
    next();
  }, 1000)
}

function bar(next) {
  setTimeout(() => {
    console.log('bar');
    next();
  }, 2000)
}

compose(foo, bar);