//worker.js
onmessage = function (e) {
    console.log(e.data); // Hello
    postMessage('Hi'); // 向主进程发送消息
};
