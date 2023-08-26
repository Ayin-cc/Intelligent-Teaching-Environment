const { contextBridge, ipcRenderer } = require('electron')

// contextBridge用于精确控制暴露模块
contextBridge.exposeInMainWorld('ipcRenderer', {// on不知道有无问题
    // 向主进程发送异步消息
    send: (channel, ...args) => {
        ipcRenderer.send(channel, ...args);
    },
    // 监听从主进程发来的消息
    on: (channel, listener) => {
        // ipcRenderer.on(channel, listener);
        ipcRenderer.on(channel, (event, ...args) => listener(...args));
    },
    // 发送一个异步消息给主进程，等待主进程执行相应的远程调用，并返回调用结果。（这是一个基于 Promises 的方法）
    invoke: async (channel, ...args) => {// async声明异步函数。允许在函数体内使用 await 关键字来：等待一个 Promise 对象的解决
        return await ipcRenderer.invoke(channel, ...args)
    }
});