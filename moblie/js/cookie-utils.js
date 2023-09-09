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

// 获取学生信息
function getStudent(sid){
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