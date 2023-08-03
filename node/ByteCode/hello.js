function sayHello(more = []) {
    console.log(['Hello', 'Byte Code', ...more].join(', '));
}
  
module.exports.sayHello = sayHello;
module.exports.stringExport = "foobar";

// sayHello();