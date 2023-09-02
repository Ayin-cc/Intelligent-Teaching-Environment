// 全局变量
var initializeData = null;

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
    // 获取到的 JSON 数据
    () => {
        fetch('../data/data.json')
            .then(response => response.json())
            .then(data => {
                // 获取成功
                initializeData = data;
            })
            .catch(error => {
                // 处理错误
                console.error('读取 JSON 文件时出错：', error);
            });
    }
    // 初始化页面数据
    () => {
        var sidDetail = document.getElementById('classroom-cid-detail');
        var positionDetail = document.getElementById('classroom-position-detail');
        sidDetail.textContent = initializeData['classroom']['cid'];
        positionDetail.textContent = initializeData['classroom']['position'];
    }
}

function updateWeb(){
    // web监听事件
    webListener();
}

function webListener(){
    var closeWindowControllerHeader = document.getElementById('closeWindow-controller-header');
    closeWindowControllerHeader.addEventListener('click',function(){
        window.ipcRenderer.send('aboutWindow', 'close-window');
    });
}