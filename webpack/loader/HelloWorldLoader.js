const fs = require('fs');
let i = 0;

module.exports = (source) => {
    console.log('hello world');
    // console.log(source);
    fs.writeFileSync(`source-${i++}.js`, source);
    return source;
};