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
    else if (day == '6') now += '日';
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
