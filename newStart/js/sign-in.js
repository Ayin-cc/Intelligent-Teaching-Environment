// 获取传入的 时间 与 频率
var urlParams = new URLSearchParams(window.location.search);
var duringTime = urlParams.get('duringTime');// string
var frequency = urlParams.get('frequency');// '10' 或 '-1'
if(duringTime == null){
    duringTime = 5;
}
if(frequency == null){
    frequency = -1;
}

// 二维码生成
function updateQRCode(){
    // 代办，未完：请在此添加从服务器获取链接的代码
    let code = "尚未与服务器取得联系，请稍等";
    let qrcode = new QRCode("QR-code", {
        text: code,
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
    });
}
updateQRCode();

var QR_img = document.getElementsByClassName('left')[0].getElementsByTagName('img')// QRCode图片获取,使用时 QR_img.item(0)
// 剩余时间
// 修改剩余时间所需的变量（全局）
var remaind_time = document.getElementsByClassName('remainder');
const startTime = new Date().getTime()
const endTime = startTime + parseInt(duringTime) * 60 * 1000;
var stopBtn = document.getElementsByClassName('stop-btn')// 停止按钮的class
// 更新剩余时间并显示在页面上
// 代办，未完：没有做10s的QR-code刷新
var stop_onclick = 0;
function updateCountdown() {
    const now = new Date().getTime();
    const remainingTime = endTime - now;
    // 将毫秒转换为分钟和秒钟
    const minutes = Math.floor(remainingTime / 1000 / 60);
    const seconds = Math.floor(remainingTime / 1000) % 60;
    
    // 将剩余时间显示在页面上
    remaind_time[0].innerHTML = `${minutes}分钟${seconds < 10 ? '0' : ''}${seconds}秒`;
    
    // 检测是否点击"停止"
    stopBtn[0].addEventListener('click',function(event){
        var first_text = document.getElementsByClassName('right')[0].getElementsByClassName('first-box')[0].getElementsByClassName('first-text');
        QR_img.item(0).src = './over.png'
        first_text.item(0).style.display = 'none';
        remaind_time[0].innerHTML = '签到已结束！';
        stop_onclick = 1;
    })
    // 如果剩余时间不为零，则每秒钟更新一次
    if (remainingTime > 0 && !stop_onclick) {
        setTimeout(updateCountdown, 1000);
    } else {
        // 否则显示提示信息
        var first_text = document.getElementsByClassName('right')[0].getElementsByClassName('first-box')[0].getElementsByClassName('first-text');
        
        QR_img.item(0).src = './over.png'
        first_text.item(0).style.display = 'none';
        remaind_time[0].innerHTML = '签到已结束！';
    }
}


// 开始倒计时
updateCountdown();




