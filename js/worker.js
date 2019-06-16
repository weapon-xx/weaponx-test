//worker.js
let time = 1;
onmessage = (e) => {
    console.log(e.data); // Hello
    postMessage(`Hi ${time++}`); // 向主进程发送消息
};
