
// function sendMessageToMain() {// debug
//     window.ipcRenderer.send('greeting', 'Hello, this is a greeting from index.js')
// }

// 内容加载完毕后
window.addEventListener('DOMContentLoaded', () => {
    //sendMessageToMain();// debug

    // // ↓↓↓↓↓控制菜单↓↓↓↓↓
    // // 监听函数
    // let controlBtn = document.getElementsByClassName('control-menu')[0].getElementsByClassName('btn-box')[0].getElementsByClassName('btn');
    // // 换图标需要
    // let imgFullScreenWindow = document.getElementsByClassName('img-fullScreenWindow')[0]
    // controlBtn[0].addEventListener('click', function () { // 最小化
    //     window.ipcRenderer.send('mainWindow_minimize', '1')
    // })
    // controlBtn[1].addEventListener('click', function () { // 最大化
    //     window.ipcRenderer.invoke('mainWindow_maximize', '1')
    //         .then(result => {
    //             if(result == 0){
    //                 imgFullScreenWindow.src = 'images/icons/复制_copy.svg'
    //             }else if(result == 1){
    //                 imgFullScreenWindow.src = 'images/icons/方形_square.svg'
    //             }
    //         })
    //         // .catch(error => {
    //         //     console.error(error);
    //         // })
    // })
    // controlBtn[2].addEventListener('click', function () { // 关闭
    //     window.ipcRenderer.send('mainWindow_close', '1')
    // })
    // // ↑↑↑↑↑控制菜单↑↑↑↑↑

    // ↓↓↓↓↓设置菜单↓↓↓↓↓
    let settingBtn = document.getElementsByClassName('setting');
    for(var i = 0; i < settingBtn.length; i++){
        settingBtn[i].addEventListener('click',function(){ // 设置
            window.ipcRenderer.send('settingWindow_create','1')
        })
        
    }
    // ↑↑↑↑↑设置菜单↑↑↑↑↑

    // ↓↓↓↓↓关于菜单↓↓↓↓↓
    let helpBtn = document.getElementsByClassName('help');
    for(var i = 0; i < settingBtn.length; i++){
        helpBtn[i].addEventListener('click',function(){ // 设置
            window.ipcRenderer.send('helpWindow_create','1')
        })
    }
    // ↑↑↑↑↑关于菜单↑↑↑↑↑
})


/* 改导航栏的样式 */
// 点击后，加粗+左边显示条条
var function_btn_box = document.getElementsByClassName("function-box")[0].getElementsByClassName('btn-box');
for(var i = 0; i < function_btn_box.length; i++ ){
    function_btn_box[i].addEventListener('click',function(event){
        // 遍历所有的 btn-box 元素
        for(var j = 0; j < function_btn_box.length; j++) {
            var btn_box = function_btn_box[j];
            // 获取子元素 a 和 before 元素
            var a = btn_box.getElementsByTagName('a')[0];
            // 将其他 a 标签的 before 宽度设为 0
            if (btn_box !== event.currentTarget) {
                a.classList.remove('active');
            }
            // 将当前 a 标签的 before 宽度设为 1
            else {
                a.classList.add('active');
            }
        }
    })
}


/* 改时间与问候语 */
// 显示时间
var time = document.getElementById('time')
function showNowDate() {
    var myDate = new Date;
    var year = myDate.getFullYear();
    var mon = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var day = myDate.getDay();
    var now = year + "年" + mon + "月" + date + "日 " + "星期";
    if (day == '1') now += '一';
    else if (day == '2') now += '二';
    else if (day == '3') now += '三';
    else if (day == '4') now += '四';
    else if (day == '5') now += '五';
    else if (day == '6') now += '六';
    else if (day == '0') now += '日';
    time.innerHTML = now;
}
// 改变问候语
var greeting = document.getElementById('greeting')
function setGreeting() {
    var myDate = new Date;
    var hour = myDate.getHours();
    var greetings = "您好！";
    if (hour >= 5 && hour < 7) greetings = "清晨好！";
    else if (hour >= 9 && hour < 12) greetings = "上午好！";
    else if (hour >= 12 && hour < 14) greetings = "中午好！";
    else if (hour >= 14 && hour < 18) greetings = "下午好！";
    else if (hour >= 18 && hour < 20) greetings = "傍晚了，您辛苦了！";
    else if (hour >= 20 && hour < 24 || hour >= 0 && hour < 5) greetings = "夜深了，注意休息！";
    greeting.innerHTML = greetings;
}

setInterval('showNowDate()', 1000);// 实时改时间 1s
setGreeting('setGreeting()', 60000);// 实时改问候语 60s


