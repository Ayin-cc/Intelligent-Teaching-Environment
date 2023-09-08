// 获取 URL 中的参数
var urlParams = new URLSearchParams(window.location.search);
var jsonData = urlParams.get('data');
var course = JSON.parse(decodeURIComponent(jsonData))

var Student = {    
    sid,      
    name,      
    major,         
    college,                
    phone
}

function fetch(url, Student){
    // 使用 fetch 发送 POST 请求到后端
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', // 设置请求头部
        },
        body: JSON.stringify({course, Student}), // 将数据转换为 JSON 字符串并包含在请求体中
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        return response.json();
        })
        .then(data => {
        console.log('成功修改数据:', data);
        })
        .catch(error => {
        console.error('发生错误:', error);
        });
}

const button = document.getElementById('button')
button.addEventListener('click', function(){            

    Student.sid = document.getElementsByClassName('studentInput').getElementById(0).value
	Student.name = document.getElementsByClassName('studentInput').getElementById(1).value
	Student.major = document.getElementsByClassName('studentInput').getElementById(2).value
	Student.college = document.getElementsByClassName('studentInput').getElementById(3).value
	Student.phone = document.getElementsByClassName('studentInput').getElementById(6).value
    
})

const AStoL = document.getElementById('AStoL')
AStoL.click = function(){
    let url = /SCUEE/addStudentToCourse
    fetch(url, Student)
}
const DStoL = document.getElementById('DStoL')
DStoL.click = function(){
    let url = /SCUEE/deleteStudentToCourse
    fetch(url, Student)
}