// 登录
document.getElementById('login_btn').onclick = function () {
    var input_username = document.getElementById("login_username").value;
    var input_password = document.getElementById("login_password").value;
    if (input_username==""||input_username==null){
        alert("请输入用户名!");
        form_login.username.focus();
        return;
    }else if(input_password==""||input_password==null){
        alert("请输入密码!");
        form_login.password.focus();
        return;
    }else{
        form_login.submit();
    }
}
// 注册
document.getElementById('register_btn').onclick = function () {
    var input_username = document.getElementById("register_username").value;
    var input_password = document.getElementById("register_password").value;
    var input_password_check = document.getElementById("register_password_check").value;

    if (input_username==""||input_username==null){
        alert("请输入用户名!");
        form_register.username.focus();
        return;
    }else if(input_password==""||input_password==null){
        alert("请输入密码!");
        form_register.password.focus();
        return;
    }else if(input_password_check!=input_password){
        alert("请确保两次输入的密码一致！")
        formregister.password_check.focus();
    }else{
        form_register.submit();
    }

}