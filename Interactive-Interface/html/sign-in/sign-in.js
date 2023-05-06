// 获取传入的 时间 与 频率
var duringTime = '5'
var frequency = '10'//默认
var urlParams = new URLSearchParams(window.location.search);
duringTime = urlParams.get('duringTime');//string
frequency = urlParams.get('frequency');
// QRCode图片获取,使用时 QR_img.item(0)
var QR_img = document.getElementsByClassName('left')[0].getElementsByTagName('img')
// 修改剩余时间所需的变量（全局）
var remaind_time = document.getElementsByClassName('remainder');
const endTime = new Date().getTime() + parseInt(duringTime) * 60 * 1000;

// 更新剩余时间并显示在页面上
function updateCountdown() {

    const now = new Date().getTime();
    const remainingTime = endTime - now;

    // 将毫秒转换为分钟和秒钟
    const minutes = Math.floor(remainingTime / 1000 / 60);
    const seconds = Math.floor(remainingTime / 1000) % 60;

    // 将剩余时间显示在页面上
    remaind_time[0].innerHTML = `${minutes}分钟${seconds < 10 ? '0' : ''}${seconds}秒`;

    // 如果剩余时间不为零，则每秒钟更新一次
    if (remainingTime > 0) {
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

