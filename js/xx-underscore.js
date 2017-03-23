//  imitate underscore.js
//  author: weapon-x
//


;(function() {

  var root = typeof self == 'object' && self.self === self && self ||
             typeof global == 'object' && global.global === global && global ||
             this ||
             {}

  const ArrayProto = Array.prototype
  const ObjectProto = Object.prototype
  const SymbolProto = typeof Symbol !== void 0 ? Symbol.prototype : null

  console.log(root);
}())
