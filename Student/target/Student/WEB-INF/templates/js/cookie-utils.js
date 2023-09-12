// 创建cookie
function setCookie(userId, token, cid = "") {
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + 3 * 60 * 60 * 1000);	// cookie三小时过期
    document.cookie = "userId=" + userId;
    document.cookie = "token=" + token;
    document.cookie = "path=/";
    if(cid != ""){
        document.cookie = "courseId=" + cid;
    }
    document.cookie = "expires=" + expdate.toGMTString();
    var a = document.cookie;
    console.log(a);
}

// 寻找cookie的值
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

// 删除cookie
function deleteCookie() {
    document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function checkCookie(i = 1) {
    // 检测cookie信息
    if (!document.cookie) {
        console.log("cookie is empty");
        // 跳转登录
        if (i == 1) {
            alert('登录已过期，请重新登录');
            window.location.href = "/Student/html/LOGIN_.html";
        }
        else return 0;
    }
    console.log(document.cookie);
    return 1;
}

function getStudentObj(){
    // 获取学生对象
    sessionStorage.removeItem("Student");
    var student = JSON.parse(sessionStorage.getItem("Student"));
    if (!student) {
        return new Promise((resolve, reject) =>{
            console.log(getCookie("userId"));
            var studentObj = new Object();
            console.log("send sid");
            $.ajax({
                type: "POST",
                dataType: "json",
                url: 'http://162.14.107.35/SCUEE/Student/getObj',
                contentType: "application/json",
                data: JSON.stringify({ "sid": getCookie("userId") }),
                success: function (result) {
                    if (result) {
                        studentObj = result;
                        sessionStorage.setItem("Student", JSON.stringify(studentObj));
                        console.log(studentObj);
                        resolve(studentObj);
                    }
                }
            })
        })
    }
    console.log(student);
    return student;
}