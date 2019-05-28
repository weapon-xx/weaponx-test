/*
* 事件中心组件
* 支持数据监听、触发、延时监听、取消监听
* 订阅/发布模式
* @author weapon-x
* @date 2017-09-16
*/
'use strict'
;(function(global) {
  var DataCenter = function() {
    this.cache = {}
    this._data = {}
    this.callbacks = {}
  }

  function observer(dataCenter, obj) {
    Object.defineProperty(dataCenter.cache, obj.key, {
      enumerable: obj.enumerable || true,
      configurable: obj.configurable || true,
      get: function() {
        return _data[obj.key];
      },
      set: function(newValue, oldValue) {
        if(newValue === oldValue) {
          retrun
        }
        dataCenter._data[obj.key] = newValue
        if(dataCenter.callbacks[obj.key] && dataCenter.callbacks[obj.key].callbacks.length !== 0) {
            dataCenter.callbacks[obj.key].callbacks.forEach(function(func) {
                // 发布
                func.call(dataCenter, newValue)
            })
        }
      }
    })
  }

  /*
  * 获取数据函数
  * @params key {Stirng} 属性名称
  * @return value {String/Object/Array/Num} 属性值
  */
  DataCenter.prototype.get = function(key, callback) {
      typeof callback === 'function' && callback(this._data[key])
  }

  /*
  * 设置数据函数
  * @params key {stirng} 属性名称
  * @params value {string/object} 属性值
  */
  DataCenter.prototype.set = function(key, value) {
    if(['string', 'number'].indexOf(typeof key) == -1) {
        console.warn('key 类型应该为字符串或者数字')
        return
    }
    this.cache[key] = value
  }

  /*
  * 监听/订阅数据函数
  * @params key {Stirng} 属性名称
  * @params callback {Function} 回调函数
  */
  DataCenter.prototype.on = function(key, callback) {
    if(['string', 'number'].indexOf(typeof key) == -1) {
      console.warn('key 类型应该为字符串或者数字')
      return
    }
    if(this.callbacks[key]) {
      this.callbacks[key].callbacks.push(callback)
    } else {
      observer(dataCenter, {
        key: key
      })
      this.callbacks[key] = {}
      this.callbacks[key].callbacks = []
      this.callbacks[key].callbacks.push(callback)
    }
  }

  // alias for method on
  DataCenter.prototype.addListener = DataCenter.prototype.bind = DataCenter.prototype.on


  DataCenter.prototype.delayOn = function() {

  }

  /*
  * 取消监听/订阅数据函数
  * @params key {Stirng} 属性名称
  * @params callback {Function} 回调函数
  */
  DataCenter.prototype.off = function(key, callback) {
    if(['string', 'number'].indexOf(typeof key) == -1) {
      console.warn('key 类型应该为字符串或者数字')
      return
    }
    var length = this.callbacks[key].callbacks.length;
    if(length !== 0) {
      for(var i = 0; i < length; i++) {
          if(this.callbacks[key].callbacks[i] === callback) {
              debugger
              this.callbacks.splice(i, 1)
          }
      }
    }
  }

  DataCenter.prototype.removeListener = DataCenter.prototype.unbind = DataCenter.prototype.off

  DataCenter.prototype.offAll = function(key) {
    if(['string', 'number'].indexOf(typeof key) == -1) {
      console.warn('key 类型应该为字符串或者数字')
      return
    }
    if(this.callbacks[key]) {
      this.callbacks[key].callbacks = []
    }
  }

  global.dataCenter = new DataCenter();
})(window)
