/********** 
* 没有管macOS，仅针对Windows
**********/

// BrowserWindow控制应用生命周期和创建原生浏览器窗口的模块
// Tray创建托盘
const { getCurrentWindow } = require('@electron/remote/main');
const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const path = require('path')


/********** 创建窗口函数 **********
* 目前实现了 "创建窗口" "创建托盘"
********** 创建窗口函数 **********/
function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 1132,
        minWidth: 1132,
        height: 700,
        minHeight: 700,
        icon: path.join(__dirname, './images/image_1.jpg'),
        frame: false,//实现头部的隐藏
        webPreferences: { // 用于控制窗口加载的网页是否集成node.js环境
            // nodeIntegration: true,
            // enableRemoteModule: true,
            // contextIsolation: true,// Electron 12.0以上版本需要的额外设置此项
            preload: path.join(__dirname, 'preload.js'),// 在渲染进程中使用node.js, 需要要配置webPreferences属性
        }
    }) // 创建浏览器窗口

    mainWindow.loadFile('index.html')// 加载 index.html

    mainWindow.webContents.openDevTools(); // 打开窗口的调试工具

    // ↓↓↓↓↓创建托盘↓↓↓↓↓
    // ↓↓↓↓↓创建托盘↓↓↓↓↓
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
    let tray = null;
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
}

// 应用程序准备就绪时触发
app.whenReady().then(() => {
    createWindow() // 调用创建窗口函数
})


// ipc
/* 
* 通过ipc进行的操作 
* 有很多，注意
*/


// 来自index.js的
ipcMain.on('greeting', (event, message) => { // debug
    console.log(`\n${message}`)
})
// 控制菜单 ↓
ipcMain.on('mainWindow_minimize', (event, message) => {
    const mainWindow = BrowserWindow.getFocusedWindow();
    if (!mainWindow.isMinimized()) {
        mainWindow.minimize();
    }
})
ipcMain.handle('mainWindow_maximize', (event, message) => {
    const mainWindow = BrowserWindow.getFocusedWindow();
    if (!mainWindow.isMaximized()) {
        mainWindow.maximize();
        // event.sender.send('controlBtn[1]_state','0')
        return 0;
    } else {
        mainWindow.restore();
        // event.sender.send('controlBtn[1]_state','1')
        return 1;
    }
})
ipcMain.on('mainWindow_close', (event, message) => {
    const mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.close();
})

// 设置菜单 ↓
ipcMain.on('settingWindow_create', (event, message) => {
    var mainWindow = BrowserWindow.getAllWindows()[0]; // 获取主窗口
    const settingWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,// 有子窗口时锁定主窗口
        width: 200,
        height: 200,
        frame: false,//实现头部的隐藏
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),// 在setting的渲染进程中使用node.js, 需要要配置webPreferences属性
        }
    })
    settingWindow.loadFile('./html/setting/setting.html');
    // settingWindow.webContents.once("dom-ready", () => {
    //     enable(settingWindow.webContents); // 启用子窗口
    // });
    settingWindow.on('close', () => {
        subWin.close();
        subWin.destroy();
    })
})
ipcMain.on('settingWindow_close',(event,message)=>{
    const settingWindow = BrowserWindow.getFocusedWindow();
    settingWindow.close();
})

// 帮助菜单 ↓
ipcMain.on('helpWindow_create', (event, message) => {
    var mainWindow = BrowserWindow.getAllWindows()[0]; // 获取主窗口
    const helpWindow = new BrowserWindow({
        parent: mainWindow,
        modal: true,// 有子窗口时锁定主窗口
        width: 200,
        height: 200,
        frame: false,//实现头部的隐藏
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js'),
        }
    })
    helpWindow.loadFile('./html/help/help.html');

    helpWindow.on('close', () => {
        subWin.close();
        subWin.destroy();
    })
})
ipcMain.on('helpWindow_close',(event,message)=>{
    const helpWindow = BrowserWindow.getFocusedWindow();
    helpWindow.close();
})


//来自sign-in.js的
ipcMain.on('sign-in-start',(event,message)=>{
    
})