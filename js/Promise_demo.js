function Promise(func) {
  const _this = this;
  this._resolve = {};
  this._reject = {};
  this.fulfilled = [];
  this.rejected = [];
  function resolve(res) {
    debugger
    if(typeof _this.fulfilled.length !== 0) {
        _this.fulfilled.shift()(res);
    }
  }
  function reject(err) {
    if(typeof _this.rejected.length !== 0) {
        _this.rejected.shift()(err);
    }
  }
  func(resolve, reject);
}


Promise.prototype.then = function(func) {
  this.fulfilled.push(func);
  return this;
}

Promise.prototype.catch = function(func) {
  this.rejected.push(func);
  return this;
}


new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('123');
  }, 1000)
}).then(function(res) {
  debugger
  console.log(res);
  return new Promise((resolve) => {
    setTimeout(() => {
      debugger
      resolve('456');
    }, 1000)
  })
}).then(res => {
  debugger
})
