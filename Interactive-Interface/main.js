/********** 
* 没有管macOS，仅针对Windows
**********/

// BrowserWindow控制应用生命周期和创建原生浏览器窗口的模块
// Tray创建托盘
const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const path = require('path')

let tray = null;


/********** 创建窗口函数 **********
* 目前实现了 "创建窗口" "创建托盘"
********** 创建窗口函数 **********/
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1000,
        minWidth: 1000,
        height: 700,
        minHeight: 700,
        icon: path.join(__dirname,'./images/image_1.jpg'),
        frame: false,//实现头部的隐藏
        webPreferences: { // 用于控制窗口加载的网页是否集成node.js环境
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    }) // 创建浏览器窗口
    // 允许使用remote
    require('@electron/remote/main').initialize()
    require("@electron/remote/main").enable(mainWindow.webContents)
    mainWindow.loadFile('index.html')// 加载 index.html

    
    // mainWindow.webContents.openDevTools();

    // ↓↓↓↓↓创建托盘↓↓↓↓↓
    // ↓↓↓↓↓创建托盘↓↓↓↓↓
    // mainWindow.webContents.openDevTools(); // 打开窗口的调试工具
    // 关闭默认菜单
    mainWindow.setMenu(null);

    // 窗口关闭的监听  
    mainWindow.on('closed', (event) => {
        mainWindow = null;
    });
    // 触发关闭时触发
    mainWindow.on('close', (event) => {
        // 截获 close 默认行为
        event.preventDefault();
        // 点击关闭时触发close事件，我们按照之前的思路在关闭时，隐藏窗口，隐藏任务栏窗口
        mainWindow.hide();
        mainWindow.setSkipTaskbar(true);

    });
    // 触发显示时触发
    mainWindow.on('show', () => { });
    // 触发隐藏时触发
    mainWindow.on('hide', () => { });

    // 创建托盘图标
    tray = new Tray(path.join(__dirname, 'images/image_1.jpg'))
    // 托盘名称
    tray.setToolTip('Intelligent Class');
    // 托盘菜单
    const contextMenu = Menu.buildFromTemplate([{
        label: '显示',
        click: () => { mainWindow.show() }
    },
    {
        label: '退出',
        click: () => { mainWindow.destroy() }
    }
    ]);
    // 载入托盘菜单
    tray.setContextMenu(contextMenu);
    // 点击触发
    tray.on('click', () => {
        // 点击通知区图标实现应用的显示或隐藏
        mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
        mainWindow.isVisible() ? mainWindow.setSkipTaskbar(false) : mainWindow.setSkipTaskbar(true);
    });
    // 关闭窗口时将应用程序最小化到托盘
    mainWindow.on('close', function (event) {
        event.preventDefault()
        mainWindow.hide()
    })
    // ↑↑↑↑↑创建托盘↑↑↑↑↑
    // ↑↑↑↑↑创建托盘↑↑↑↑↑
    // 监听渲染进程发送的最小化窗口消息
    ipcMain.on('minimize-window', () => {
        mainWindow.minimize();
    });
}

// 应用程序准备就绪时触发
app.whenReady().then(() => {
    createWindow() // 调用创建窗口函数
})

