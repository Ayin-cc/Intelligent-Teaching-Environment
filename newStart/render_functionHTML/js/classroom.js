//构建对象
const postion = document.getElementById('RP').value
const PNumber = document.getElementById('PN').value
const address = postion+PNumber
const cid = document.getElementById('id').value
const classroom = {
    cid,
    address,
    // token,
}

//fetch与数据库接口
function network(url, Classroom){
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json', // 设置请求头部
        },
        body: JSON.stringify(Classroom), // 将数据转换为 JSON 字符串并包含在请求体中
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
            return Data
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
}

//查询并展示 包含修改和删除按钮
function query(url, classroom){
    
    const data = network(url, classroom)
    
    
    //更新HTML
    //清空之前查询
    const DC = document.getElementsByClassName('results')[0]
    DC.innerHTML = '';
    data.forEach(function(result,index){   
        //创建元素以展示属性
        
        const displayCR = document.createElement('p');
        DC.appendChild(displayCR)

        const span = document.createElement('span')
        span.setAttribute('class', "dropdown-text")
        displayCR.appendChild(span)

        // 展示对象属性 并把在data里的索引作为id
        const contains = document.createElement('div')
        contains.id = index
        contains.textContent = "教室id:" + result.cid +"地址:" + result.address
        span.appendChild(contains)


        
        //创建下拉框元素div
        const drop = document.createElement('div')
        displayCR.appendChild(drop)//接在 p里
        drop.setAttribute('class', "dropdown-content")
        //创建两个drop子元素 a


        const change = document.createElement('a')
        change.textContent = '修改'
        // 通过URL传送result里的classroom
        const jsonData = JSON.stringify(result)
        const urlchange = './changeR.html?data=' + encodeURIComponent(jsonData);
        change.href = urlchange
        drop.appendChild(change)

        /*
        const del = document.createElement('a')
        del.setAttribute('herf', './deleteR.html')
        del.textContent = '删除'
        const urldel = './deleteR.html?data=' + encodeURIComponent(classroom)
        del.href = urlchange
        drop.appendChild(del)
        */
       //打开弹窗按钮
        const del = document.createElement('button')
        del.textContent = '删除'
        del.setAttribute('class', 'openModalBtn')
       

        drop.appendChild(del)//弹窗按钮添加到操作框

        //弹窗
        const modal = document.createElement('div')
        modal.classList.add('modal')
        document.body.appendChild(modal)//添加到body
        //弹窗内容
        const modal_content = document.createElement('p')
        modal_content.classList.add('modal-content') 
        modal_content.textContent = '确定删除？'
        modal.appendChild(modal_content)

        //弹窗两个按钮
        const confirmBtn = document.createElement('button')
        confirmBtn.classList.add('confirmBtn')
        confirmBtn.textContent = '确定'
        const cancelBtn = document.createElement('button')
        cancelBtn.classList.add('cancelBtn')
        cancelBtn.textContent = '取消'
        modal_content.append(confirmBtn)
        modal_content.append(cancelBtn)




        
    })
    
    //使用按钮绑定下拉框
    const dropdowncontents = document.querySelectorAll('.dropdown-text')
    const dropdowns = document.querySelectorAll(".dropdown-content");

    for (let i = 0; i < dropdowncontents.length; i++) {
        const dropdowncontent = dropdowncontents[i];
        
        // 使用闭包将当前的 i 值传递给事件监听器
        (function(index) {
            dropdowncontent.addEventListener('click', function() {
            let dropdown = dropdowns[index];
            console.log(index);
            dropdown.classList.toggle('show');

    
 


            });
        })(i);
    }

    //打开弹窗
    const modals = document.querySelectorAll('.modal')    
    const confirmBtns = document.getElementsByClassName('confirmBtn')
    const cancelBtns = document.getElementsByClassName('cancelBtn')
    const openModalBtns = document.getElementsByClassName('openModalBtn')

    for(let i = 0; i < openModalBtns.length; i++){
        const openModalBtn = openModalBtns[i];
        (function(index){
            openModalBtn.onclick = function() {
                modals[index].style.display = "block";

    // 关闭弹窗
                cancelBtns[index].onclick = function(){
                    modals[index].style.display = "none"; 
                }

    // 当用户点击确定按钮时，可以执行相应的操作
                confirmBtns[index].onclick = function() {
    
                    const url = /SCUEE/deleteClassroom
                    network(url,data[index])
                    alert("确定按钮被点击了！");
                    modals[index].style.display = "none"; // 关闭弹窗
                }

    // 当用户点击模态背景时，关闭弹窗
                window.onclick = function(event) {
                    if (event.target == modals[i]) {
                    modals[index].style.display = "none";
                    }
                }
            }
        })(i)
    }
    //返回查询结果的数量
    return dropdowncontents.length

    
}

//返回
const back = document.getElementById('back')
back.click = function(){
    window.history.back()
}

//以下功能里的URL需要重设
//查询
const butQuery = document.getElementById('butQuery')
butQuery.addEventListener('click',function(){

    const url = /SCUEE/queryClassroom

    query(url)
})

//添加
const butAdd = document.getElementById('butAdd')
butAdd.addEventListener('click', function(){

    let url = /SCUEE/queryClassroom

    const i = query(url, classroom)
    if(i){
        //提示教室属性重复
        alert('内容重复')
    }
    else{//添加教室
        url = /SCUEE/addClassroom
        network(url, classroom)
    }
})
        
