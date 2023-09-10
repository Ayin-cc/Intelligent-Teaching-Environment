// 创建cookie
function setCookie(userId, token){
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + 3 * 60 * 60 * 1000);	// cookie三小时过期
    document.cookie = "userId=" + userId + ";token=" + token + ";expires=" + expdate.toGMTString();
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
function deleteCookie(){
    document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
