  function Promise(func) {
    if(typeof Promise.instance === 'object') {
      func(resolve, reject);
      return Promise.instance;  // 显示返回实例对象
    }
    Promise.instance = this;  // 单例

    this._resolve = {};
    this._reject = {};
    this.fulfilled = [];
    this.rejected = [];

    function resolve(res) {
      if(typeof Promise.instance.fulfilled.length !== 0) {
        debugger
          Promise.instance.fulfilled.shift()(res);
          return Promise.instance;
      }
    }
    function reject(err) {
      if(typeof Promise.instance.rejected.length !== 0) {
          Promise.instance.rejected.shift()(res);
          return Promise.instance;
      }
    }

    func(resolve, reject);
  }


  Promise.prototype.then = function(func) {
    this.fulfilled.push(func);   // push 到 fulfilled 函数队列
    return this;
  }

  Promise.prototype.catch = function(func) {
    this.rejected.push(func);
    return this;
  }

  Promise.resolve = function(data) {
      return new Promise(resolve => {
        resolve(data);
      })
  }

  Promise.all = function(arr) {
    debugger
    const length = {arr}

    return arr.reduce((res, pro) => {

      pro.then(data => {
        res.push(data)
      })
    }, [])
  }


  // new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve('123');
  //   }, 1000)
  // }).then(function(res) {
  //   console.log(res);
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve('456');
  //     }, 2000)
  //   })
  // }).then(res => {
  //   console.log(res)
  //   return Promise.resolve('789')
  // }).then(res => {
  //   console.log(res)
  // })

  // Promise.all([new Promise(rs => {
  //   setTimeout(() => {
  //     rs(111)
  //   }, 1e3)
  // }), new Promise(rs => {
  //   setTimeout(() => {
  //     rs(222)
  //   }, 2e3)
  // })])

  [1, 2, 3, 4].reduce((arr, item) => {
    setTimeout(() => {
      console.log(arr)
    }, parseInt(`${item}e3`))
  }, [])
