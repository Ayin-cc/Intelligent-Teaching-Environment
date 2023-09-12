const { app, BrowserWindow, Menu, Tray, ipcMain, Notification } = require('electron')
const path = require('path')


app.on('ready',()=>{
    mainWindow = new BrowserWindow({
        width:1280,
        height:720,
        icon: path.join(__dirname, './images/image_1.jpg'),
        frame: true,
        webpreferences:{
            nodeIntegration:true
        }
    })



    mainWindow.loadFile('./html/SignIn.html')
    //来自李欣哲的
    
    

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

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
})

//暂时不需要
// 控制菜单 ↓
// ipcMain.on('mainWindow_minimize', (event, message) => {
//     const mainWindow = BrowserWindow.getFocusedWindow();
//     if (!mainWindow.isMinimized()) {
//         mainWindow.minimize();
//     }
// })
// ipcMain.handle('mainWindow_maximize', (event, message) => {
//     const mainWindow = BrowserWindow.getFocusedWindow();
//     if (!mainWindow.isMaximized()) {
//         mainWindow.maximize();
//         // event.sender.send('controlBtn[1]_state','0')
//         return 0;
//     } else {
//         mainWindow.restore();
//         // event.sender.send('controlBtn[1]_state','1')
//         return 1;
//     }
// })
ipcMain.on('mainWindow_close', (event, message) => {
    const mainWindow = BrowserWindow.getFocusedWindow();
    mainWindow.close();
})
