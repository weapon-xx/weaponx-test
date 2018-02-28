'use strict';

function EMPTYFUNCTION() {};

function judgeType(obj, type) {
  if(!obj || !type) {
    return false;
  }
  try {
    return Object.prototype.toString.call(obj).toLocaleLowerCase().split(/\s/)[1].replace(']', '') === type;
  } catch(e) {
    console.error(e);
  }
}


// promise 状态 PENDING -> resolved 或者 PENDING -> REJECTED
const PENDING = 0;
const FULFILLED = 1;
const REJECTED = 2;

function xxPromise(resolver) {
  if(!judgeType(resolver, 'function')) {
    return new TypeError('resolver is not function');
  }

  this.state = PENDING;
  this.value = void 666;
  this.queue = [];

  // 在 then 中新产生的 promise 的回调是空函数，这个新 pormise 可以被认为是内部 promise
  // 需要根据外部的 promise 的状态和值去产生自身的状态和值，而外部的 promise 需要传入回调去
  // 去决定内部的 promise 的状态和值
  if(resolver !== EMPTYFUNCTION) {
    safelyResolveThen(this, resolver);
  }
}

function safelyResolveThen(self, resolver) {
  let called = false; // called 控制 resolve 或 reject 只能执行一次
  try {
    // 执行 promise 函数
    resolver(function(data) {
      if(called) {
        return
      }
      called = true;
      doResolve(self, data);
    }, function() {
      if(callled) {
        return
      }
      called = true;
      doReject(self, error);
    })
  } catch(e) {
    if(called) {
      return ;
    }
    called = true;
    doReject(self, error)
  }
}

function doResolve(self, value) {
  try {
    const then = getThen(value);
    if(then) {
      safelyResolveThen(self, then);   //** 假如返回值是 promise 则继续调用 **
    } else {
      self.state = FULFILLED;
      self.value = value;
      self.queue.forEach(queueItem => {
        queueItem.callFulfilled(value);
      });
    }
    return self;
  } catch(error) {
    return doReject(self, error);
  }
}

function doReject(self, error) {
  self.state = REJECTED;
  self.value = error;
  self.queue.forEach(queueItem => {
    queueItem.callRejected(error);
  })
  return self;
}

function getThen(obj) {
  const then = obj && obj.then;
  // 如果返回值为 promise 的话，则返回 then 函数，并且 then 函数的 this 指向了返回的 promise 也就是 obj
  if(obj && (judgeType(obj, 'object') || judgeType(obj, 'function')) && judgeType(then, 'function')) {
    return function appyThen() {
      then.apply(obj, arguments);
    }
  }
}

// then 方法生成一个新的 promise 对象并返回
xxPromise.prototype.then = function(onFulfilled, onRejected) {
  if(!judgeType(onFulfilled, 'function') && this.state === FULFILLED ||
     !judgeType(onRejected, 'function') && this.state === REJECTED) {
       return this;   // 直接返回当前的 promise 实例，实现值穿透
  }
  const promise = new this.constructor(EMPTYFUNCTION);  // 子 promise 传入空函数作为回调
  // 如果状态发生改变，则调用 unwrap，否则将生成新的 promise 加入到当前 promise 的回调队列 queue 中
  if(this.state !== PENDING) {
    const resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this.value);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }
  return promise;
}

xxPromise.prototype.catch = (onRejected) => {
  return this.then(null, onRejected);
}


function unwrap(promise, func, value) {
    let returnValue;
    try {
      returnValue = func(value);
    } catch(error) {
      doReject(promise, error);
    }
    // 返回值不能为 promise 本身，不然会造成死循环
    if(returnValue === promise) {
      doReject(promise, new TypeError('Cannot resolve promise with itself'));
    } else {
      // 继续解子 promise
      doResolve(promise, returnValue);
    }
}

function QueueItem(promise, onFulfilled, onRejected) {
  this.promise = promise;
  this.callFulfilled = function(value) {
    doResolve(this.promise, value);
  }
  this.callRejected = function(error) {
    doReject(this.promise, error);
  }
  if(judgeType(onFulfilled, 'function')) {
    this.callFulfilled = function(value) {
      unwrap(this.promise, onFulfilled, value);
    }
  }
  if(judgeType(onRejected, 'function')) {
    this.callRejected = function(error) {
      unwrap(this.promise, onRejected, error);
    }
  }
}

xxPromise.resolve = function(value) {
  if(value instanceof this) {
    return value;
  }
  return doResolve(new this(EMPTYFUNCTION), value);
}

xxPromise.reject = function(reason) {
  const promise = new this(EMPTYFUNCTION);
  return doReject(promisem, reason)
}

xxPromise.all = function(arr) {
  if(!Array.isArray(arr)) {
    doReject(new TypeError('arr is not iterable'));
  }

  const self = this;
  const length = arr.length;
  const values = new Array(length);
  const promise = new this(EMPTYFUNCTION);
  let called = false;
  let resolved = 0;
  let i = 0;

  while(i < length) {
    allResolver(arr[i], i);
    i++;
  }
  return promise;

  function allResolver(value, i) {
    self.resolve(value).then(resolveFromAll, function(error) {
      if(!called) {
        called = true;
        doReject(promise, error);
      }
    })

    function resolveFromAll(value) {
      values[i] = value;
      if(++resolved === length && !called) {
        called = true;
        doResolve(promise, values);
      }
    }
  }
}

xxPromise.race = function(arr) {
  if(!Array.isArray(arr)) {
    doReject(new TypeError('arr is not iterable'));
  }

  const self = this;
  const length = arr.length;
  const promise = new this(EMPTYFUNCTION);
  let called = false;
  let i = 0;

  while(i < length) {
    allResolver(arr[i], i);
    i++;
  }
  return promise;

  function allResolver(value, i) {
    self.resolve(value).then(function(data) {
      if(!called) {
        called = true;
        doResolve(promise, data);
      }
    }, function(error) {
      if(!called) {
        called = true;
        doReject(promise, error);
      }
    })
  }
}
