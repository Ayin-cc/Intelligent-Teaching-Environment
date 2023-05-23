//实现右侧弹出消息通知
window.onload = function () {
    suportCheck();
    displayMessage('初始化成功','这里是通知内容！初始化成功！',"./image_1.jpg")
}

function displayMessage(title_message, body_message){
    var m = new Notification(title_message, { //消息标题
        body: body_message, //消息体内容
    });
}
function displayMessage(title_message, body_message, icon_message) {
    var m = new Notification(title_message, { //消息标题
        body: body_message, //消息体内容
        icon: icon_message, //消息图片
    });
}

// ↓ debug用
// 检测是否支持该功能，未调用
function suportCheck() {
    suportNotify()
}
//判断浏览器是否支持Web Notifications API
function suportNotify() {
    if (window.Notification) {
        // 支持
        console.log("支持" + "Web Notifications API");
        //如果支持Web Notifications API，再判断浏览器是否支持弹出实例
        showMess()
    } else {
        // 不支持
        alert("不支持 Web Notifications API");
    }
}
//判断浏览器是否支持弹出实例
function showMess() {
    setTimeout(function () {
        console.log('1：' + Notification.permission);
        //如果支持window.Notification 并且 许可不是拒绝状态
        if (window.Notification && Notification.permission !== "denied") {
            //Notification.requestPermission这是一个静态方法，作用就是让浏览器出现是否允许通知的提示
            Notification.requestPermission(function (status) {
                console.log('2: ' + status);
                //如果状态是同意
                if (status === "granted") {
                    var m = new Notification('检测完毕', {
                        body: '这里是通知内容！支持消息弹出', //消息体内容
                        icon: "./image_1.jpg" //消息图片
                    });
                    m.onclick = function () { //点击当前消息提示框后，跳转到当前页面
                        window.focus();
                    }
                } else {
                    alert('当前浏览器不支持弹出消息')
                }
            });
        }
    }, 1000)
}