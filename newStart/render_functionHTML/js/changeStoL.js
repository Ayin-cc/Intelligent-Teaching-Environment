// 获取 URL 中的参数
var urlParams = new URLSearchParams(window.location.search);
var jsonData = urlParams.get('data');
var course = JSON.parse(decodeURIComponent(jsonData))
const token = course.token

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
            if(data == 1){
                alert("操作成功")
                
                window.history.back();
            }else{
                alert("后端操作失败")
            }
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
}

const button = document.getElementById('button')
button.addEventListener('click', function(){            

    const sid = document.getElementsByClassName('studentInput').getElementById(0).value
	const name = document.getElementsByClassName('studentInput').getElementById(1).value
	const major = document.getElementsByClassName('studentInput').getElementById(2).value
	const college = document.getElementsByClassName('studentInput').getElementById(3).value
	const phone = document.getElementsByClassName('studentInput').getElementById(6).value

    var Student = {    
        sid,      
        name,      
        major,         
        college,                
        phone,
        token
    }
    
    const AStoL = document.getElementById('AStoL')
    AStoL.addEventListener('click',function(){
        let url = "http://162.14.107.35/SCUEE/administrator/addStudentToCourse"
        fetch(url, Student)
    })
    const DStoL = document.getElementById('DStoL')
    DStoL.addEventListener('click',function(){
        let url = "http://162.14.107.35/SCUEE/administrator//SCUEE/deleteStudentToCourse"
        fetch(url, Student)
    })
})

