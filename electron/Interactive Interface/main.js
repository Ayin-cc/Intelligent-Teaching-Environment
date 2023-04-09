// 控制应用生命周期和创建原生浏览器窗口的模块
const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        minWidth: 1000,
        height: 750,
        minHeight: 750
        //实现头部的隐藏
        // frame: false
    }) // 创建浏览器窗口
    mainWindow.loadFile('index.html')      // 加载 index.html
}

// 应用程序准备就绪时触发
app.whenReady().then(() => {
    createWindow() // 创建窗口

    // macOS 上需要的特殊处理，以正确打开窗口
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 所有窗口关闭时触发
app.on('window-all-closed', function () {
    // 除 macOS（darwin）外，关闭所有窗口时通常意味着退出应用程序
    if (process.platform !== 'darwin') app.quit()
})
