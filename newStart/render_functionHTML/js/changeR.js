// 获取 URL 中的参数
var urlParams = new URLSearchParams(window.location.search);
var jsonData = urlParams.get('data');
var classroom = JSON.parse(decodeURIComponent(jsonData))


// 在控制台输出接收到的数据
//console.log(classroom);

//设置默认值
const address = classroom.address
const RoomPostion = document.getElementById('RP')
const select = address[0]+address[1]
RoomPostion.value = select

const num = document.getElementById('PN')
let number = ''
for(let i = 2; i < address.length; i++){
     number = number + address[i] + ''
}
num.setAttribute('placeholder', number)

const id = document.getElementById('id')
id.placeholder = classroom.cid

//以下功能里的URL需要重设 完成
//修改
const button = document.getElementById('button')
button.addEventListener('click', function(){            
    const postion = document.getElementById('RP').value
    const PNumber = document.getElementById('PN').value
    const address = postion+PNumber
    const cid = document.getElementById('id').value
    const token = classroom.token

    const QueryClassroom = {
        cid,
        address,
        token
    }
        
    // 使用 fetch 发送 POST 请求到后端
    //这里URL需要重设
    const url = "http://162.14.107.35/SCUEE/administrator/changeClassroom"
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', // 设置请求头部
        },
        body: JSON.stringify(QueryClassroom), // 将数据转换为 JSON 字符串并包含在请求体中
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