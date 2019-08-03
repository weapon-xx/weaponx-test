console.log('script start');

process.nextTick(() => {
    console.log('nextTick 执行1');
});

process.nextTick(() => {
    console.log('nextTick 执行2');
});

setImmediate(() => {
    console.log('setImmediate 执行1');

    process.nextTick(() => {
        console.log('nextTick 插入');
    });
});

setImmediate(() => {
    console.log('setImmediate 执行2');
});

console.log('script end');

// script start
// script end
// nextTick 执行1
// nextTick 执行2
// setImmediate 执行1
// setImmediate 执行2
// nextTick 插入
