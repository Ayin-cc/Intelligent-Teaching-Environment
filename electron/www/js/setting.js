
// ==================================================
// 当纯 HTML 被完全加载以及解析时
// ==================================================
document.addEventListener('DOMContentLoaded', function () {
    // web初始化
    initializeWed();
    // web的刷新
    updateWeb();
});

// *************************
// *    函数
// *    一般放在DOMContentLoaded监听触发后
// *************************

// ==================================================
// 初始化
// ==================================================
function initializeWed() {

}

function updateWeb(){
    // web监听事件
    webListener();
}

function webListener(){
    var closeWindowControllerHeader = document.getElementById('closeWindow-controller-header');
    closeWindowControllerHeader.addEventListener('click',function(){
        window.ipcRenderer.send('settingWindow', 'close-window');
    });
}