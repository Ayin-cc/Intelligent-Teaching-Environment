
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
