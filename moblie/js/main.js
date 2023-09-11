const user_infor = document.getElementById('user_inf');
const noneuser = document.getElementById('user_no');
const user_all = document.getElementById('user_all');
const message_button = document.getElementById('message-sidebar');
const timetable_button = document.getElementById('timetable-sidebar');
const signIn_button = document.getElementById('signIn-sidebar');
const communication_button = document.getElementById('communication-sidebar');

var login_status = 1;

$(document).ready(function () {
	// 检测cookie信息
	login_status = checkCookie(0);
	var student = getStudentObj();
	// 初始化（登陆状态）
	login_statu();
	// 使用学生对象替换页面中的值
	const stdName = document.getElementById('name-profile');
	const stdID = document.getElementById('number-profile');
	stdName.textContent = student.name;
	stdID.textContent = student.sid;
})
// 登录信息显示
function login_statu() {
	if (login_status == 1) {
		togglePages(user_infor, noneuser);
	} else {
		togglePages(noneuser, user_infor);
	}
}
// 登录信息显隐转换
function togglePages(pageToShow, pageToHide) {
	pageToShow.classList.remove('hidden');
	pageToHide.classList.add('hidden');
}

// 未登录的提示信息
function nologtip() {
	// 获取提示框元素
	const messageBox = document.getElementById('messageBox');
	const countdown = document.getElementById('countdown');

	// 倒计时秒数
	let seconds = 3;
	let hidde_status = 0;

	// 显示提示框
	messageBox.style.display = 'block';

	// 更新倒计时显示
	const updateCountdown = () => {
		countdown.textContent = seconds + ' 秒后自动跳转至登陆界面';
		seconds--;
	};

	// 更新倒计时并自动隐藏提示框
	const countdownInterval = setInterval(() => {
		if (seconds >= 0) {
			updateCountdown();
		} else {
			clearInterval(countdownInterval); // 停止倒计时
			setTimeout(() => {
				messageBox.style.display = 'none'; // 移除提示框
				window.location.href = 'html/LOGIN_.html';
			}, 500); // 等待过渡结束后移除
		}
	}, 1000);

	messageBox.addEventListener('click', () => {
		clearInterval(countdownInterval);
		setTimeout(() => { messageBox.style.display = 'none'; }, 200); // 等待过渡结束后移除
		hidde_status = 1;
	});
}



// 点击事件---用户头像区域
user_all.addEventListener('click', () => {
	if (login_status == 0) {
		setTimeout(() => {
			window.location.href = 'html/LOGIN_.html';
		}, 100); // 等待过渡结束后移除
	} else {
		window.location.href = 'html/mine.html';
	}
});

// 点击事件---功能区
message_button.addEventListener('click', () => {
	if (login_status == 0) {
		nologtip();
	} else {
		window.location.href = 'html/message1.0.html';
	}
});
signIn_button.addEventListener('click', () => {
	if (login_status == 0) {
		nologtip();
	} else {
		window.location.href = 'html/sign.html';
	}
});
timetable_button.addEventListener('click', () => {
	if (login_status == 0) {
		nologtip();
	} else {
		window.location.href = 'html/timetable1.0.html';
	}
});
communication_button.addEventListener('click', () => {
	if (login_status == 0) {
		nologtip();
	} else {
		window.location.href = 'html/communication.html';
	}
});
