'use strict';
class xxPromise {
  constructor(fn) {
    const _this = this;
    this.state = 'pending';
    this.result = null;
    this.reason = null;

    this.resolvedHandler = null;
    this.rejectedHandler = null;

    this._promise = {};
    this._promise._p = _this;
    this._promise.then = (resolvedHandler, rejectedHandler) => {
      switch(_this.state) {
        case 'pending':
          _this.resolvedHandler = (typeof resolvedHandler === 'function') ? resolvedHandler : null;
          _this.rejectedHandler = (typeof rejectedHandler === 'function') ? rejectedHandler : null;
          break;
        case 'resolved':
          if(typeof resolvedHandler === 'function') {
            return resolvedHandler(_this.result)
          }
          break;
        default:
          if(typeof rejectedHandler === 'function') {
            return rejectedHandler(_this.reason);
          }
      }
    }

    function resolved(val) {
      _this.state = 'resolved';
      _this.result = val;
      if(typeof _this.resolvedHandler === 'function') {
        _this.resolvedHandler(val);
      }
    }

    function rejected(err) {
      _this.state = 'rejected';
      _this.reason = err;
      if(typeof _this.rejectedHandler === 'function') {
        __this.rejectedHandler();
      }
    }

    fn(resolved, rejected);

    return this._promise;
  }
}

xxPromise.all = () => {
  
}
