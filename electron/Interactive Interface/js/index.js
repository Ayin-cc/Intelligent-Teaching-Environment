/******
* 打开就启动的项目 
******/
window.onload = function () {
    // supportSSE() // 检查功能的，一般不用
    showMessage("一般通知","通知已启动，喵！","这条通知是告诉你通知功能正在运作，喵呜~")
}
/******
* 以下为SSE的代码
* 调用showMessage("","","")发出通知，在Windows通知栏弹出
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