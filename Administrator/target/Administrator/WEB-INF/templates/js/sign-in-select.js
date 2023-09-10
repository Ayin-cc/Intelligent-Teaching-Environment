// 默认值
var duringTime = 5;
var frequency = 10;
var inputBtn_onclick = 0;
// 点击效果
var timeBtn = document.getElementsByClassName('first-li')[0].getElementsByClassName('function-box')[0].getElementsByClassName('btns')
for (let i = 0; i < timeBtn.length; i++) {
    timeBtn[i].addEventListener('click', function (event) {
        for (let j = 0; j < timeBtn.length; j++) {
            let btn = timeBtn.item(j).getElementsByClassName('btn');
            btn.item(0).style.fontWeight = '400';
            timeBtn.item(j).style.backgroundColor = 'rgba(132, 198, 245, 0.1)';
            timeBtn.item(j).style.border = '2px dashed rgba(255, 255, 255, 0)';
        }
        let btnText = timeBtn.item(i).getElementsByClassName('btn');
        btnText.item(0).style.fontWeight = '600';
        timeBtn.item(i).style.backgroundColor = 'rgba(132, 198, 245, 0.2)';
        timeBtn.item(i).style.border = '2px dashed rgba(155, 148, 148, 0.4)';

        if (i == '0') {
            inputBtn_onclick = 0;
            duringTime = 5;
        }
        else if (i == '1') {
            inputBtn_onclick = 0;
            duringTime = 20;
        }
        else if (i == '2') {
            duringTime = 45;
            inputBtn_onclick = 0;
        }
        else if (i == '3') {
            duringTime = parseInt(document.getElementById('sign-in-duration').value);
            inputBtn_onclick = 1;
        }
    })
}
var frequencyBtn = document.getElementsByClassName('second-li')[0].getElementsByClassName('function-box')[0].getElementsByClassName('btns')
for (let i = 0; i < frequencyBtn.length; i++) {
    frequencyBtn[i].addEventListener('click', function (event) {
        for (let j = 0; j < frequencyBtn.length; j++) {
            let btn = frequencyBtn.item(j).getElementsByClassName('btn');
            btn.item(0).style.fontWeight = '400';
            frequencyBtn.item(j).style.backgroundColor = 'rgba(132, 198, 245, 0.1)';
            frequencyBtn.item(j).style.border = '2px dashed rgba(255, 255, 255, 0)';
        }
        let btnText = frequencyBtn.item(i).getElementsByClassName('btn');
        btnText.item(0).style.fontWeight = '600';
        frequencyBtn.item(i).style.backgroundColor = 'rgba(132, 198, 245, 0.2)';
        frequencyBtn.item(i).style.border = '2px dashed rgba(155, 148, 148, 0.4)';

        if (i == 0) {
            frequency = 10;
        } else if (i == 1) {
            frequency = -1;
        }
    })
}

// 
var startBtn = document.getElementsByClassName('down-box')[0].getElementsByClassName('btn-box')
startBtn.item(0).addEventListener('click', function (event) {
    if (inputBtn_onclick == 1) {
        var inputElem = document.getElementById('sign-in-duration');
        var inputValue = inputElem.value;
        if (inputValue != '') {
            duringTime = parseInt(inputValue);
        } else {
            duringTime = 5;
        }
    }
  
    var params = new URLSearchParams();
    params.append('duringTime', duringTime);
    params.append('frequency', frequency);
    var url = './sign-in.html?' + params.toString();

    window.location.href = url;
})
