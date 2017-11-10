function Observe(data) {
  this.data = data;
  this.walk(data);
}

Observe.prototype = {
  walk(data) {
    const _this = this;
    // 遍历对象所有属性
    Object.keys(data).forEach(key => {
      _this.defineReactive(data, key, data[key]);
    })
  },
  defineReactive(data, key, val) {
    const dep = new Dep();
    var childObj = observe(val);

    // 访问器劫持
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get() {
        if(Dep.target) {
          dep.depend();
        }
        return val
      },
      set(newVal) {
        if(newVal === val) {
          return
        }
        val = newVal;
        childObj = observe(newVal);
        // 通知
        dep.notify();
      }
    })
  }
}

function observe(value,vm) {
  // 判断属性是否为对象
  if(!value || typeof value !== 'object') return
  // 是的话继续监听
  return new Observe(value);
}

var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {
  addSub(sub) {
    // 添加 subscript
    this.subs.push(sub);
  },
  depend() {
    // Watcher.addDep
    Dep.target.addDep(this);
  },
  removeSub(sub) {
    const index = this.subs.indexOf(sub);
    if(index === -1) {
      this.subs.splice(indx,1);
    }
  },
  notify(){
    // 遍历执行更新
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}

Dep.target = null
