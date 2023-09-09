// 获取 URL 中的参数
var urlParams = new URLSearchParams(window.location.search);
var jsonData = urlParams.get('data');
var course = JSON.parse(decodeURIComponent(jsonData))



// 在控制台输出接收到的数据s
console.log(course);
//设置默认值
const courseNum = document.getElementById(0)
const courseName = document.getElementById(1)
const teacher = document.getElementById(2)

courseNum.placeholder = course.number
courseName.placeholder = course.name
teacher.placeholder = course.teacher



//修改
const button = document.getElementById('butchange')
button.addEventListener('click', function(){            
    const courseNum = document.getElementById(0).value
    const courseName = document.getElementById(1).value
    const teacher = document.getElementById(2).value
    const Course = {
        courseNum,
        courseName,
        teacher
    }

    const url = /SCUEE/changeCourse
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', // 设置请求头部
        },
        body: JSON.stringify(Course), // 将数据转换为 JSON 字符串并包含在请求体中
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('网络请求失败');
        }
        return response.json();
        })
        .then(data => {
            const Data = JSON.parse(decodeURIComponent(data))
            console.log('成功保存数据:', Data);
            alert('修改成功')
            window.history.back()
        })
        .catch(error => {
        console.error('发生错误:', error);
        });
        
})

const CStoL = document.createElement('a')
const url = './changeStoL.html?data=' + encodeURIComponent(jsonData);
CStoL.href = url
CStoL.textContent='修改学生名册'
const propertyInput = document.getElementsByClassName('propertyInput')[0]
propertyInput.append(CStoL)

