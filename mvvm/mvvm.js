function Mvvm(options){
  this.$options = options;
  var data = this._data = this.$options.data;
  var _this = this;
  //
  Object.keys(data).forEach(function(key){
    _this._proxy(key)
  })

  observe(data,this)

  this.$compile = new Compile(options.el || document.body,this)
}

Mvvm.prototype = {
  $watch(key,cb,options){
    new Watch(this,key,cb)
  },
  _proxy(key){
    // 属性代理
    var _this = this;
    Object.defineProperty(_this,key,{
      enumerable: true,
      configurable : false,
      get(){
        return _this._data[key]
      },
      set(newVal){
        _this._data[key] = newVal;
      }
    })
  }
}
