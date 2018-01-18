'use strict';
class myPromise {
  constructor(fn) {
    const _self = this;
    this.state = 'pending';

    this.resolvedHandler = null;
    this.rejectedHandler = null;
    fn(this.resolved, this.rejected);
  }


  resolved(val) {

  }

  rejected(err) {

  }
}
