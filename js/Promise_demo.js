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
const FULFILLED = 0;
const REJECTED = 0;

function xxPromise(resolver) {
  if(!judgeType(resolver, 'function')) {
    return new error('argument must be a function');
  }

  this.state = PENDING;
  this.value = void 666;

  if(resolved !== EMPTYFUNCTION) {
    safelyResolveThen(this, resolver);
  }
}

// called 控制 resolve 和 reject 只能执行一次
function safelyResolveThen(self, resolver) {
  let called = false;
  try {
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
      safelyResolveThen(self, value);
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
  // 如果 then 是函数则将 obj 作为函数 this 调用
  if(obj && (judgeType(obj, 'object') || judgeType(obj, 'function')) && judgeType(then, 'function')) {
    return function appyThen() {
      then.apply(obj, arguments);
    }
  }
}

xxPromise.prototype.then = (onFulfilled, onRejected) => {
  if(!judgeType(onFulfilled, 'function') && this.state === FULFILLED ||
     !judgeType(onRejected, 'function' && this.state === REJECTED)) {
       return this;
  }
  const promise = new this.constructor(EMPTYFUNCTION);
  if(this.state !== PENDING) {
    const resolver = this.state === FULFILLED ? onFulfilled : onRejected;
    unwrap(promise, resolver, this,value);
  } else {
    this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
  }
  return promise;
}

xxPromise.prototype.catch = (onRejected) => {
  return this.then(null, onRejected);
}
