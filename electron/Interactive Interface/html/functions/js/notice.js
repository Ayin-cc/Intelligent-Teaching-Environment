/******
* 打开就启动的项目 
******/
window.onload = function () {
    // supportSSE() // 检查功能的，一般不用
    showMessage("一般通知","通知已启动，喵！","这条通知是告诉你通知功能正在运作，喵呜~")
}
/******
* 以下为SSE的代码
* 调用showMessage("","","")发出通知，windows弹出
* 注意：
******/
function showMessage(type,title,content){
    var m = new Notification(type, {
        tag: type,
        title: title,// 
        body: title+"\n"+ content,
    })
}

var sse = new EventSource("");
sse.onmessage = function (event) {
    var data = JSON.parse(event.data);// 转化为JSON
    var Jtype = data.type;//"一般通知"、"重要通知"、"宣传"
    var Jtitle = data.title;
    var Jcontent = data.content;
    showMessage(Jtype,Jtitle,Jcontent)
}


/******
* 以下为检查的函数，调用supportSSE()就可以了
* 注意：可以不用
******/
// 1.判断是否支持SSE
function supportSSE() {
    if ('EventSource' in window) {
        console.log("支持SSE")
        supportNotify()
    } else {
        alert("不支持SSE")
    }
}
// 2.判断浏览器是否支持Web Notifications API
function supportNotify() {
    if (window.Notification) {
        // 支持
        console.log("支持" + "Web Notifications API");
        //如果支持Web Notifications API，再判断浏览器是否支持弹出实例
        supportShowMess();
    } else {
        // 不支持
        alert("不支持 Web Notifications API");
    }
}
// 3.判断浏览器是否支持弹出实例
function supportShowMess() {
    setTimeout(function () {
        console.log('1：' + Notification.permission);
        //如果支持window.Notification 并且 许可不是拒绝状态
        if (window.Notification && Notification.permission !== "denied") {
            //Notification.requestPermission这是一个静态方法，作用就是让浏览器出现是否允许通知的提示
            Notification.requestPermission(function (status) {
                console.log('2: ' + status);
                //如果状态是同意
                if (status === "granted") {
                    console.log("支持弹出消息")
                    // 到这步就说明可以弹出了
                } else {
                    alert('当前浏览器不支持弹出消息')
                }
            });
        }
    }, 1000)
}