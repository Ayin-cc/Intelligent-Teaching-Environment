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

// 获取学生信息
function getStudent(sid) {
    var student;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: 'http://162.14.107.35/SCUEE/DistrMsg/get',
        contentType: "application/json",
        data: JSON.stringify({ "id": getdetail_mes() }),
        success: function (result) {
            if (result != "") {
                student = result;
            }
        }
    })
    return student;
}

function checkCookie(i = 1) {
    // 检测cookie信息
    if (document.cookie.isEmpty()) {
        // 跳转登录
        if (i == 1) {
            alert('登录已过期，请重新登录');
            window.location.href = "/Student/html/LOGIN_.html";
        } else return 0;
    }
}

function getStudentObj(){
    // 获取学生对象
    if (sessionStorage.getItem("Student") == "") {
        var studentObj = getStudent(getCookie("userId"));
        sessionStorage.setItem("Student", JSON.stringify(studentObj));
    }
    student = sessionStorage.getItem("Student");
    return student;
}