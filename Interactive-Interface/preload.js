const { contextBridge, ipcRenderer } = require('electron')

// contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
// 只暴露ipcRenderer.send()  ipcRenderer.on()  ipcRenderer.invoke()
contextBridge.exposeInMainWorld('ipcRenderer', {
    send: (channel, data) => {
        // 通过 ipcRenderer 发送消息
        ipcRenderer.send(channel, data)
    },
    on: (channel, func) => {
        // 监听从主进程发送回来的消息，并触发回调函数
        ipcRenderer.on(channel, (event, ...args) => func(...args))
    },
    invoke: async (channel, ...args) => {
        return await ipcRenderer.invoke(channel, ...args)
    }
});


// const fs = require('fs')
// fs.readFile("package.json", (err, data) => {
//     if (err) {
//         console.log("err")
//     }
//     console.log(data.toString())
// })