const remote = require('@electron/remote')
// 内容加载完毕后
window.addEventListener('DOMContentLoaded', () => {

    // ↓↓↓↓↓控制菜单↓↓↓↓↓
    // ↓↓↓↓↓控制菜单↓↓↓↓↓
    // 利用remote可以获取当前窗口对象
    let mainWindow = remote.getCurrentWindow()
    // 监听函数
    let controlBtn = document.getElementsByClassName('control-menu')[0].getElementsByClassName('btn-box')[0].getElementsByClassName('btn');
    // 换图标
    let imgFullScreenWindow = document.getElementsByClassName('img-fullScreenWindow')[0]
    controlBtn[0].addEventListener('click', function () {
        // 最小化
        if(!mainWindow.isMinimized()){
            mainWindow.minimize();
        }
    })
    controlBtn[1].addEventListener('click', function () {
        // 最大化
        if(!mainWindow.isMaximized()){
            mainWindow.maximize();
            imgFullScreenWindow.src='images/icons/复制_copy.svg'
        }else{
            mainWindow.restore();
            imgFullScreenWindow.src='images/icons/方形_square.svg'
        }
    })
    controlBtn[2].addEventListener('click', function () {
        // 关闭
        mainWindow.close();
    })
    // ↑↑↑↑↑控制菜单↑↑↑↑↑
    // ↑↑↑↑↑控制菜单↑↑↑↑↑
})