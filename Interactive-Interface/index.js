
function sendMessageToMain() {// debug
    window.ipcRenderer.send('greeting', 'Hello, this is a greeting from index.js')
}

// 内容加载完毕后
window.addEventListener('DOMContentLoaded', () => {
    sendMessageToMain();// debug

    // ↓↓↓↓↓控制菜单↓↓↓↓↓
    // 监听函数
    let controlBtn = document.getElementsByClassName('control-menu')[0].getElementsByClassName('btn-box')[0].getElementsByClassName('btn');
    // 换图标需要
    let imgFullScreenWindow = document.getElementsByClassName('img-fullScreenWindow')[0]
    controlBtn[0].addEventListener('click', function () { // 最小化
        window.ipcRenderer.send('mainWindow_minimize', '1')
    })
    controlBtn[1].addEventListener('click', function () { // 最大化
        window.ipcRenderer.invoke('mainWindow_maximize', '1')
            .then(result => {
                if(result == 0){
                    imgFullScreenWindow.src = 'images/icons/复制_copy.svg'
                }else if(result == 1){
                    imgFullScreenWindow.src = 'images/icons/方形_square.svg'
                }
            })
            // .catch(error => {
            //     console.error(error);
            // })
    })
    controlBtn[2].addEventListener('click', function () { // 关闭
        window.ipcRenderer.send('mainWindow_close', '1')
    })
    // ↑↑↑↑↑控制菜单↑↑↑↑↑

    // ↓↓↓↓↓设置菜单↓↓↓↓↓
    let settingBtn = document.getElementsByClassName('setting');
    for(var i = 0; i < settingBtn.length; i++){
        settingBtn[i].addEventListener('click',function(){ // 设置
            window.ipcRenderer.send('settingWindow_create','1')
        })
        
    }
    // ↑↑↑↑↑设置菜单↑↑↑↑↑
})

