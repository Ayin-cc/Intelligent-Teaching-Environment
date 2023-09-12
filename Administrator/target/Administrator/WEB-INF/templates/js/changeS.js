
// 获取 URL 中的参数
var urlParams = new URLSearchParams(window.location.search);
var jsonData = urlParams.get('data');
var student = JSON.parse(decodeURIComponent(jsonData))


// 在控制台输出接收到的数据
//console.log(student);

//设置默认值            
const dSid = document.getElementById(0)
const dName = document.getElementById(1)
const dMajor = document.getElementById(2)
const dCollege = document.getElementById(3)
const dPhone = document.getElementById(6)

dSid.placeholder = student.sid
dName.placeholder = student.name
dMajor.placeholder = student.major
dCollege.placeholder = student.college
dPhone.placeholder = student.phone

//修改
const btn = document.getElementById('addStudent')
btn.addEventListener('click',function(){
    const sid = document.getElementById(0).value
    const name = document.getElementById(1).value
    const major = document.getElementById(2).value
    const college = document.getElementById(3).value
    const phone = document.getElementById(6).value
    const token = student.token
    const Student = {
        sid,
        name,
        major,
        college,
        phone,
        token
    }
    
    const url = "http://162.14.107.35/SCUEE/administrator/changeStudent"
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', // 设置请求头部
        },
        body: JSON.stringify(Student), // 将数据转换为 JSON 字符串并包含在请求体中
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
        
})














const button = document.getElementById('addStudent')
button.addEventListener('click', function(){            
    const sid = document.getElementById(0).value
	const name = document.getElementById(1).value
	const major = document.getElementById(2).value
	const college = document.getElementById(3).value
	const phone = document.getElementById(6).value
    const Student = {    
         sid,      
         name,      
         major,         
         college,                
         phone
    }
    // console.log(Student)          


    // 使用 fetch 发送 POST 请求到后端
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', // 设置请求头部
        },
        body: JSON.stringify(Student), // 将数据转换为 JSON 字符串并包含在请求体中
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        return response.json();
        })
        .then(data => {
        console.log('成功保存数据:', data);
        })
        .catch(error => {
        console.error('发生错误:', error);
        });
})