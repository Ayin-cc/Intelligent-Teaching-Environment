// 创建cookie
function setCookie(userId, token, cid = "") {
    var expdate = new Date();
    token = "admin";
    expdate.setTime(expdate.getTime() + 3 * 60 * 60 * 1000);	// cookie三小时过期
    document.cookie = "userId=" + userId;
    document.cookie = "token=" + token;
    if(cid != ""){
        document.cookie = "courseId=" + cid;
    }
    document.cookie = "path=/";
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
    deleteCookie();
    console.log(document.cookie);
    //setCookie(getCookie("userId"), "admin");
    // 检测cookie信息
    if (!document.cookie || document.cookie == undefined) {
        console.log("cookie is empty");
        // 跳转登录
        if (i == 1) {
            alert('登录已过期，请重新登录');
            window.location.href = "SignIn.html";
        }
        else return 0;
    }
    return 1;
}