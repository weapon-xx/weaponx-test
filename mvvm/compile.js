function Compile(el,vm){
  this.$vm = vm;
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);

  if(this.$el){
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  node2Fragment(el){
    var fragment = document.createDocumentFragment();
    var child;

    // 将原生节点拷贝到fragment
    while(child = el.firstChild){
      fragment.appendChild(child)
    }

    return fragment
  },
  init(){
    this.compileElement(this.$fragment)
  },
  compileElement(el){
    const childNodes = el.childNodes,
          _this = this;

    // 遍历子节点
    Array.prototype.slice.call(childNodes).forEach(function(node){
      const text = node.textNode,
            reg  = /\{\{(.*)\}\}/;

      if(_this.isElementNode(node)){
        // 解析元素节点
        _this.compile(node);
      }else if(_this.isTextNode(node) && reg.test(text)){
        // 解析差值表达式
        _this.compileText(node,RegExp.$1);
      }

      if(node.childNodes && node.childNodes.length){
        // 继续递归解析子节点
        _this.compileElement(node);
      }
    })
  },
  compile(node){
    const nodeAttrs = node.attributes,
          _this = this;

    // 遍历节点属性
    Array.prototype.slice.call(nodeAttrs).forEach(function(attr){
      const attrName = attr.name;
      if(_this.isDirective(attrName)){
        const exp = attr.value,
              dir = attrName.substring(2);

        if(_this.isEventDirective(dir)){
          // 事件指令
          compileUtil.eventHandler(node,_this.$vm,exp,dir);
        }else{
          // 普通指令
          compileUtil[dir] && compileUtil[dir](node,_this.$vm,exp)
        }

        // 移除 vue 指令
        node.removeAttribute(attrName)
      }
    })
  },
  compileText(node,exp){
    // 处理差值表达式
    compileUtil.text(node,this.$vm,exp)
  },
  isElementNode(node){
    // 判断节点类型
    return  node.nodeType === 1;
  },
  isDirective(attr){
    // 判断 vue 指令
    return attr.indexOf('v-') === 0;
  },
  isEventDirective(dir){
    // 判断事件指令
    return dir.indexOf('on') === 0;
  },
  isTextNode(node){
    // 判断文本节点
    return node.nodeType === 3;
  }
}


// 指令处理集合
const compileUtil = {
  bind(node,vm ,exp,dir){
    const updaterFn = updater[dir + 'Updater'];

    updaterFn && updaterFn(node , this._getVMVal(vm,exp));

    new Watcher(vm,exp,function(value,oldValue){
      updaterFn && updaterFn(node,value,oldValue)
    })
  },
  _getVMVal(vm,exp){
    // 获取 vm[exp]
    var val = vm._data;
    exp = exp.split('.')
    exp.forEach(function(k){
      val = val[k]
    })
    return val
  },
  eventHandler(){

  },
  html(node,vm,exp){
    this.bind(node,vm,exp,'html')
  },
  class(){

  },
  text(node,vm,exp){
    this.bind(node ,vm ,exp , 'text');
  }
}

const updater = {
  textUpdater(node ,value){
    node.textContent = typeof value === 'undefined' ? '' : value
  },
  htmlUpdater(node,value){
    node.innerHTML = typeof value === 'undefined' ? '' : value
  },
  classUpdater(){

  },
  modelUpdater(){

  }
}
