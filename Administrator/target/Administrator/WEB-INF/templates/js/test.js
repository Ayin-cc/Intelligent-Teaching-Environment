// 获取DOM元素
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

function fetch(url, message){
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', // 设置请求头部
        },
        body: JSON.stringify(message), // 将数据转换为 JSON 字符串并包含在请求体中
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
    })
    .then(data => {
        console.log('成功保存数据:', data);
    })
    .catch(error => {
        console.error('发生错误:', error);
    });
}

//设置URL
const url = /SCUEE/DistrMsg/create
// 处理发送按钮点击事件
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        fetch(url, message)// 在这里你可以将消息发送到后端或执行其他操作
        messageInput.value = ''; // 清空输入框
    }
});

// 处理回车键按下事件
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        const message = messageInput.value;
        if (message) {
            fetch(url, message)// 在这里你可以将消息发送到后端或执行其他操作
            messageInput.value = ''; // 清空输入框
        }
    }
});