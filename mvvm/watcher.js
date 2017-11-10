function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.depIds = {};
  this.value = this.get();
}

Watcher.prototype = {
  update() {
    this.run();
  },
  run() {
    const value = this.get(),
          oldVal = this.value;

    if(value !== oldVal) {
      this.value = value;
      // 更新回调函数
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep(dep) {
    // 如果之前没有依赖则添加依赖
    if(!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  },
  get() {
    // 传递watcher实例
    Dep.target = this;
    // 触发get
    const value = this.getVMVal();
    Dep.target = null;
    return value
  },
  getVMVal() {
    var exp = this.exp.split('.'),
        value = this.vm._data;

    exp.forEach(key => {
      value = value[key];
    })
    return value
  }
}
