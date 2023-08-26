// BrowserWindow控制应用生命周期和创建原生浏览器窗口的模块
// Tray创建托盘
const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron')
const path = require('path')

// 全局变量
let mainWindow = null;
let tray = null;

// 应用程序准备就绪时触发
app.whenReady().then(() => {
    setupIPCListeners(); // 设置 IPC 监听器
    createWindow(); // 创建窗口或执行其他初始化操作
})


// 重点!
// 函数 //

// 创建主界面
// (调用'创建托盘'、)
function createWindow() {

    // mainWindow
    // 主窗口的一些设置
    mainWindow = new BrowserWindow({ // 设置窗口
        width: 1132, minWidth: 1132,
        height: 700, minHeight: 700,
        icon: path.join(__dirname, './www/icons/icon.jpg'),
        frame: false,// 实现头部的隐藏
        webPreferences: { // 在渲染进程中使用node.js, 需要要配置webPreferences属性
            preload: path.join(__dirname, 'preload.js'), //
        }
    })

    mainWindow.loadFile('./www/index.html')// 加载 index.html
    mainWindow.setMenu(null); // 关闭默认菜单

    mainWindow.webContents.openDevTools(); // 打开窗口的调试工具(debug)

    // 创建托盘
    // 内含对mainWindow.close的截获，但好像并没有使用过
    createTray();

}


// 创建托盘
function createTray() {
    // // 触发显示时触发
    // mainWindow.on('show', () => { });
    // // 触发隐藏时触发
    // mainWindow.on('hide', () => { });

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

    // 创建托盘图标
    tray = new Tray(path.join(__dirname, './www/icons/icon.jpg'));
    // 托盘名称
    tray.setToolTip('Intelligent Class');
    // 托盘菜单
    const contextMenu = Menu.buildFromTemplate([{
        label: '显示',
        click: () => { mainWindow.show() }
    },
    {
        label: '隐藏',
        click: () => { mainWindow.hide() }
    },
    {
        type: 'separator' // 添加分隔线
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

}

// ipcMain创建的Listener
function setupIPCListeners() {
    // 
    ipcMain.on('mainWindow',function(event, message){
        if( message == 'minimize-window'){
            mainWindow.minimize(); // 最小化
        }else if(message == 'fullscreen-window'){
            if (mainWindow.isMaximized()) {
                mainWindow.unmaximize(); // 取消最大化
            } else {
                mainWindow.maximize(); // 最大化
            }
        }else if(message == 'close-window'){
            mainWindow.hide(); // 隐藏
        }
    });
}