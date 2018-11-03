console.log('begin')

setImmediate(() => {
    console.log('setImmediate 1')
})

setTimeout(() => {
    console.log('setTimeout')
})

setImmediate(() => {
    console.log('setImmediate 2')
})

process.nextTick(() => {
    console.log('nextTick')
})

Promise.resolve().then(data => {
    console.log('promise')
})

console.log('end')