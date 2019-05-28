const critical = require('critical');

critical.generate({
    inline: true,
    base: '../js/',
    src: 'emoji.html',
    dest: 'emoji-critical.html',
    width: 375,
    height: 667
});