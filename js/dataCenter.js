/**
* 数据管理组件
*
*
*/

class DataCenter {
  constructor() {
    this.cache = {};
  }

  get (key) {
    return cache && cache[key].val
  }

  set (key, val) {
    let item = this.cache[key]
    if (item) {
      if (val !== item.val && item.listen && item.listen.length) {
        let oval = item.val;
        item.listen.forEach(cb => {
          cb && cb(val, oval);
        })
      }
      item.val = val;
    } else {
      cache[key] = {val: val}
    }
    return this;
  }

  on (key, callback, context) {
    let item = cache[key] || (cache[key] = {listen: []});
    context = context || this;
    (item.listen || (item.listen = [])).push(callback.bind(context));
    return this;
  }

  off (key, callback) {
    let item;
    if (item && item.listen && item.listen.length) {
      if (callback) {
        item.listen = item.listen.filter((i) => { i !== callback })
      } else {
        item.listen.length = 0
      }
    }
    return this;
  }

  once (key, callback, context) {
    context = context || this;
    if (callback) {
      var me = this;
      function fn (nval, oval) {
        callback.call(context, nval, oval);
        me.off(key, fn)
      }
      this.on(key, fn)
    }
    return this;
  }

  first (key, callback, context) {
    context = context || this;
    let item
    if (item = this.get(key)) {
      callback.call(context, item, null)
    } else {
      this.once(key, callback, context)
    }
    return this
  }
}
