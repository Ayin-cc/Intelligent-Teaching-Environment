

// ==================================================
// 当纯 HTML 被完全加载以及解析时
// ==================================================
document.addEventListener("DOMContentLoaded", function () {

    // 消除选择(单击任意地方3秒后，清除选择)
    // (done)
    var clickTimeout;
    document.addEventListener("click", function () {
        if (clickTimeout) {
            clearTimeout(clickTimeout);
        }

        clickTimeout = setTimeout(function () {
            if (window.getSelection) {
                var selection = window.getSelection();
                selection.removeAllRanges();
            }
        }, 3000); // 3s
    });

    // web的刷新
    updateWeb();
    // homepage的刷新
    updateHomepage();
    // signIn的刷新
    updateSignIn();
    updateRollCall();
    updateRandomSelection();
    updateMessage();
    updateWallpaper();

});

// *************************
// *    函数
// *    一般放在DOMContentLoaded监听触发后
// *************************

// ==================================================
// 主要监听事件
// ==================================================
function updateWeb() {
    // 需要借助main中实现的：
    // 菜单栏操作(最小化，最大化，还原，关闭(隐藏))
    // (done)
    var minimizeWindowControllerHeader = document.getElementById('minimizeWindow-controller-header');
    var fullscreenWindowControllerHeader = document.getElementById('fullscreenWindow-controller-header');
    var closeWindowControllerHeader = document.getElementById('closeWindow-controller-header');
    minimizeWindowControllerHeader.addEventListener('click', function () {
        window.ipcRenderer.send('mainWindow', 'minimize-window');
    });
    fullscreenWindowControllerHeader.addEventListener('click', function () {
        window.ipcRenderer.send('mainWindow', 'fullscreen-window');
        var imgElement = fullscreenWindowControllerHeader.querySelector('img');
        console.log(imgElement.src);
        // 更改图标
        if (imgElement.classList.contains('fullscreened')) {
            imgElement.classList.add('h-6');
            imgElement.classList.add('w-6');
            imgElement.classList.remove('h-4');
            imgElement.classList.remove('w-4');
            imgElement.classList.remove('fullscreened');
            imgElement.src = './icons/333/小方形.svg';
        } else {
            imgElement.classList.add('h-4');
            imgElement.classList.add('w-4');
            imgElement.classList.remove('h-6');
            imgElement.classList.remove('w-6');
            imgElement.classList.add('fullscreened');
            imgElement.src = './icons/333/复制2.svg';
        }

    });
    closeWindowControllerHeader.addEventListener('click', function () {
        window.ipcRenderer.send('mainWindow', 'close-window');
    });


    // 顶部的folder点击，切换显示状态
    // (done)
    var folderMenuHeaderBtn = document.getElementById('folder-menu-header');
    folderMenuHeaderBtn.addEventListener('click', function () {
        // 旋转图片
        var folderImg = folderMenuHeaderBtn.querySelector('img');
        var imgTransform = window.getComputedStyle(folderImg).getPropertyValue('transform');
        if (imgTransform == 'none') {
            folderImg.style.transform = 'rotate(-90deg)';
        } else {
            folderImg.style.transform = 'none';
        }
        // 隐藏元素
        var menuHeader = document.getElementById('menu-header');
        var hideableElements = menuHeader.querySelectorAll('.hide-able');
        hideableElements.forEach(function (element) {
            element.classList.toggle('hide');
        });

    });
    // sidebar(左边栏)的folder(底部的folder)点击，切换折叠状态 
    // 注意! 这个调整了很多东西
    // (done)
    var sidebar = document.getElementById('sidebar');
    var folderMenuSidebarBottom = document.getElementById('folder-menu-sidebarBottom');
    folderMenuSidebarBottom.addEventListener('click', function () {
        // 隐藏元素
        var hideableElements = sidebar.querySelectorAll('.hide-able');
        hideableElements.forEach(function (element) {
            element.classList.toggle('hide');
        });
        // 调整间距


        var resizableElements = sidebar.querySelectorAll('.resizable');
        resizableElements.forEach(function (element) {
            if (element.classList.contains('mx-10')) {
                element.classList.remove('mx-10');
                element.classList.add('re-mx-10');
                // sidebar设为70px，防止折叠时又一次收缩
                // 但还是会收缩（折叠时最宽是66px，但不知为何会伸缩）
                // 遂，还改为66px，给`#sidebar-top`添加css，min-width: 66px
                sidebar.style.width = '66px';
            } else if (element.classList.contains('re-mx-10')) {
                element.classList.remove('re-mx-10');
                element.classList.add('mx-10');
                sidebar.style.width = '16.666667%';
            }

            if (element.classList.contains('mx-8')) {
                element.classList.remove('mx-8');
                element.classList.add('re-mx-8');
            } else if (element.classList.contains('re-mx-8')) {
                element.classList.remove('re-mx-8');
                element.classList.add('mx-8');
            }

            if (element.classList.contains('ml-10')) {
                element.classList.remove('ml-10');
                element.classList.add('re-ml-10');
                element.classList.add('ml-2');
            } else if (element.classList.contains('re-ml-10')) {
                element.classList.remove('re-ml-10');
                element.classList.remove('ml-2');
                element.classList.add('ml-10');
            }

            if (element.classList.contains('p-4')) {
                element.classList.remove('p-4');
                element.classList.add('p-2');
                element.classList.add('re-p-4');
            } else if (element.classList.contains('re-p-4')) {
                element.classList.remove('re-p-4');
                element.classList.remove('p-2');
                element.classList.add('p-4');
            }

        });

    });

    // sidebar的"功能"按钮点击，切换折叠状态
    // (done)
    var functionSidebarBtn = document.getElementById('function-sidebar');
    functionSidebarBtn.addEventListener('click', function () {
        // 旋转图片
        var folderBtn = document.getElementById('folder-function-sidebar');
        var folderImg = folderBtn.querySelector('img');
        var imgTransform = window.getComputedStyle(folderImg).getPropertyValue('transform');
        if (imgTransform == 'none') {
            folderImg.style.transform = 'rotate(90deg)';
        } else {
            folderImg.style.transform = 'none';
        }
        // 隐藏元素
        var functionsSidebarBtn = document.getElementById('functions-sidebar');
        var hideableElements = functionsSidebarBtn.querySelectorAll('.foldable');
        hideableElements.forEach(function (element) {
            element.classList.toggle('hide');
        });

    });

    // 切换主题模式
    var checkbox = document.getElementById("theme-toggle");
    var htmlElement = document.documentElement;
    checkbox.addEventListener("change", function () {
        var isChecked = checkbox.checked;
        if (isChecked) {
            htmlElement.classList.toggle("dark");
        } else {
            htmlElement.classList.toggle("dark");
        }
    });


    // sidebar的btns点击效果，以及切换content
    // (done)
    var clickableSidebarElements = sidebar.querySelectorAll('.clickable');
    // 用于页面内容切换的变量
    var content = document.getElementById('content');
    var hideableHomepageElements = content.querySelectorAll('.hide-able');

    clickableSidebarElements.forEach(function (element) {
        // element是each clickable元素
        element.addEventListener('click', function () {
            // 切换content(只有这里是"切换content")
            // 获取被点击的元素的 id
            var clickedId = this.id;
            // 遍历所有 hideableElements
            hideableHomepageElements.forEach(function (hideableElement) {
                // 获取 hideableElement 的 id
                var hideableId = hideableElement.id;
                // 如果 hideableElement 的 id 包含 clickedId，则移除 hide 类，否则添加 hide 类
                if (clickedId.includes(hideableId)) {
                    hideableElement.classList.remove('hide');
                } else {
                    hideableElement.classList.add('hide');
                }
            });


            // 对全部操作
            clickableSidebarElements.forEach(function (item) {
                // item是each clickable元素
                var textElement = item.querySelector('.text');
                var imgElement = item.querySelector('img');
                var originalSrc = imgElement.src;


                // -----改文字-----
                // (light mode)
                textElement.classList.remove('text-purple-600');
                textElement.classList.add('text-zinc-950');
                // (dark mode)
                textElement.classList.remove('dark:font-bold');

                // -----改图片-----

                if (htmlElement.classList.contains('dark')) {
                    // (DARK mode)
                    // 改的是light mode的图片
                    // 因为dark mode懒得做单独的颜色，用css改的
                    // 要切换到light mode时，未选中的颜色改为黑色
                    if (originalSrc.includes('9013fe')) {
                        imgElement.src = originalSrc.replace('/9013fe/', '/333/');
                    }
                } else {
                    // (LIGHT mode)
                    if (originalSrc.includes('9013fe')) {
                        imgElement.src = originalSrc.replace('/9013fe/', '/333/');
                    }

                }

                // -----改背景、':hover'与':before'-----
                // (light mode)
                item.classList.remove('bg-gray-100');
                item.classList.remove('hover:bg-gray-200');
                item.classList.remove('before:bg-purple-600');
                item.classList.add('hover:bg-gray-100');
                item.classList.add('before:bg-slate-200');
                item.classList.add('before:hover:bg-slate-400');
                // (dark mode)
                item.classList.remove('dark:bg-zinc-600');
                item.classList.remove('dark:hover:bg-zinc-500');
                item.classList.remove('dark:before:bg-purple-400');
                item.classList.add('dark:hover:bg-zinc-600');
                item.classList.add('dark:before:bg-zinc-600');
                item.classList.add('dark:before:hover:bg-zinc-400');
            });
            // 以下单独对点击的元素操作
            var thisText = this.querySelector('.text');
            var thisImg = this.querySelector('img');
            var originalSrc = thisImg.src;

            // -----改文字-----
            // (light mode)
            thisText.classList.remove('text-zinc-950');
            thisText.classList.add('text-purple-600');
            // (dark mode)
            this.classList.add('dark:font-bold');

            // -----改图片-----

            if (htmlElement.classList.contains('dark')) {
                // (DARK mode)
                if (originalSrc.includes('333')) {
                    thisImg.src = originalSrc.replace('/333/', '/9013fe/');
                }
            } else {
                // (LIGHT mode)
                if (originalSrc.includes('333')) {
                    thisImg.src = originalSrc.replace('/333/', '/9013fe/');
                }
            }

            // -----改背景颜色-----
            // (light mode)
            this.classList.remove('hover:bg-gray-100');
            this.classList.remove('before:bg-slate-200');
            this.classList.remove('before:hover:bg-slate-400');
            this.classList.add('bg-gray-100');
            this.classList.add('hover:bg-gray-200');
            this.classList.add('before:bg-purple-600');
            // (dark mode)
            this.classList.remove('dark:hover:bg-zinc-600');
            this.classList.remove('dark:before:bg-zinc-600');
            this.classList.remove('dark:before:hover:bg-zinc-400');
            this.classList.add('dark:bg-zinc-600');
            this.classList.add('dark:hover:bg-zinc-500');
            this.classList.add('dark:before:bg-purple-400');
        });
    });
}

// ==================================================
// 首页
// homepage(首页)
// ==================================================
function updateHomepage() {
    // 初始化：
    // 立即更新一次时间
    updateHomepageDateTime();
    updateHomepageGreeting();
    // 持续性
    // 每秒钟更新一次时间
    setInterval(function () {
        updateHomepageDateTime();
        updateHomepageGreeting();
    }, 1000);


}
// 更新homepage时间
function updateHomepageDateTime() {

    var timeHomepage = document.getElementById('time-homepage');
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString('zh-CN', {
        year: 'numeric',// 显示年份，以数字形式展示。
        month: 'long',// 显示月份的完整名称，如 "一月"。
        day: 'numeric',
        hour: '2-digit',// 显示小时，以两位数字形式展示，不足两位的前面会加上零。
        minute: '2-digit',
        second: '2-digit'
    }); // 格式化当前日期时间
    timeHomepage.textContent = formattedDateTime; // 将格式化后的日期时间设置为元素的文本内容
}
// 更新homepage问候语
function updateHomepageGreeting() {
    var greetingHomepage = document.getElementById('greeting-homepage');
    var currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 7) {
        greetingHomepage.textContent = "清晨好！新的一天开始了，希望你有个美好的开始。";
    } else if (currentHour >= 7 && currentHour < 12) {
        greetingHomepage.textContent = "早上好！新的一天开始了，希望你有个美好的开始!";
    } else if (currentHour >= 12 && currentHour < 14) {
        greetingHomepage.textContent = "中午好！是时候休息一下啦。";
    } else if (currentHour >= 14 && currentHour < 18) {
        greetingHomepage.textContent = "下午好！继续加油努力吧!";
    } else if (currentHour >= 18 && currentHour < 21) {
        greetingHomepage.textContent = "傍晚好！夕阳的余晖让一切都变得温暖。";
    } else if (currentHour >= 21 && currentHour < 23) {
        greetingHomepage.textContent = "晚上好！夜晚是创意和思考的好时机。";
    } else if (currentHour >= 23 || currentHour < 5) {
        greetingHomepage.textContent = "夜深了，早点休息。";
    }
}
// ==================================================
// 签到
// signIn(签到)
// ==================================================
let signInStateMachine = 0;// 签到状态机 0.签到设置；1.正在签到；2.展现签到结果
function updateSignIn() {
    updateInputTangeSignIn();// 更新滑动条显示数字
    customSignIn();// 自定义项
    signInStart();// 发起签到
    // 已将“签到持续中”调到“发起签到”函数中
    // 已将“签到结束”调到“签到持续中”中

}
// 更新滑动条显示数字
function updateInputTangeSignIn() {
    // 输入后改数字
    // 初始化
    var signInDurationInput = document.getElementById('signIn-duration-input');
    var signInDurationLabel = document.getElementById('signIn-duration-label');
    signInDurationLabel.textContent = signInDurationInput.value;
    var signInFrequencyInput = document.getElementById('signIn-frequency-input');
    var signInFrequencyLabel = document.getElementById('signIn-frequency-label');
    signInFrequencyLabel.textContent = signInFrequencyInput.value;
    // 持续
    signInDurationInput.addEventListener("input", function () {
        signInDurationLabel.textContent = signInDurationInput.value;
    });
    signInFrequencyInput.addEventListener("input", function () {
        signInFrequencyLabel.textContent = signInFrequencyInput.value;
    });


}
// 签到-自定义
function customSignIn() {
    // 签到时长-自定义
    var signInDurationCustomInputToggle = document.getElementById('signIn-custom-duration-input-toggle');
    var inputBoxSignInDuration = document.getElementById('inputBox-signIn-duration');
    var inputBoxSignInCustomDuration = document.getElementById('inputBox-signIn-custom-duration');
    signInDurationCustomInputToggle.addEventListener('change', function () {
        if (signInDurationCustomInputToggle.checked) {
            inputBoxSignInDuration.classList.add('hidden');
            inputBoxSignInDuration.classList.remove('flex');
            inputBoxSignInCustomDuration.classList.add('flex');
            inputBoxSignInCustomDuration.classList.remove('hidden');

        } else {
            inputBoxSignInDuration.classList.add('flex');
            inputBoxSignInDuration.classList.remove('hidden');
            inputBoxSignInCustomDuration.classList.add('hidden');
            inputBoxSignInCustomDuration.classList.remove('flex');
        }
    });
    // 签到时长-自定义-标准化输入值
    var signInCustomDurationInput = document.getElementById('signIn-custom-duration-input');
    signInCustomDurationInput.addEventListener('blur', function () {
        let inputValue = parseFloat(signInCustomDurationInput.value);
        if (isNaN(inputValue)) {
            inputValue = 5; // 如果输入不是有效数字，设置默认值为 5
        } else {
            inputValue = Math.floor(inputValue); // 向下取整
            inputValue = Math.min(120, Math.max(5, inputValue)); // 限制在 5 到 120 之间
        }
        signInCustomDurationInput.value = inputValue;
    });
}
// 开始签到(没有初始化，偷懒放在`signInContinuing()`中了)
function signInStart() {
    var signInStartBtn = document.getElementById('signIn-start-btn');
    var signInSelect = document.getElementById('signIn-select');
    var signInInterface = document.getElementById('signIn-interface');
    signInStartBtn.addEventListener('click', function () {
        signInSelect.classList.add('hide');
        signInInterface.classList.remove('hide');
        signInStateMachine = 1;
        signInContinuing()// 签到持续中
    });
}
// 签到中
// (unfinished)
// 没有获取学生信息，没有已签到学生数量、学生总数。遂只设置初始数据
// 没有二维码
function signInContinuing() {

    var signInSelect = document.getElementById('signIn-select');
    var signInInterface = document.getElementById('signIn-interface');
    var signInResult = document.getElementById('signIn-result');

    if (signInStateMachine == 1) {
        // 返回
        var signInRestartBtn = document.getElementById('signIn-restart-btn');
        signInRestartBtn.addEventListener('click', function () {
            signInInterface.classList.add('hide');
            signInSelect.classList.remove('hide');
            signInStateMachine = 0;
        });
        // 前进
        var signInFinishBtn = document.getElementById('signIn-finish-btn');
        signInFinishBtn.addEventListener('click', function () {
            signInInterface.classList.add('hide');
            signInResult.classList.remove('hide');
            signInStateMachine = 2;
        });
        // 获取网页数据
        var signInCustomDurationInputToggle = document.getElementById('signIn-custom-duration-input-toggle');
        var duration = 10 * 60;
        var frequency = 60;
        if (signInCustomDurationInputToggle.checked) {
            var signInCustomDurationInput = document.getElementById('signIn-custom-duration-input');
            var signInFrequencyInput = document.getElementById('signIn-frequency-input');
            duration = signInCustomDurationInput.value;
            frequency = signInFrequencyInput.value;
        } else {
            var signInDurationInput = document.getElementById('signIn-duration-input');
            var signInFrequencyInput = document.getElementById('signIn-frequency-input');
            duration = signInDurationInput.value * 60;
            frequency = signInFrequencyInput.value;
        }
        // 没有获取学生信息，没有已签到学生数量、学生总数。遂只设置初始数据（unfinished）
        var totalCount = 50;
        var signedCount = 0;

        // 持续性改变消息
        // 倒计时
        var countdownTime = document.getElementById('countdownSignInTime');
        const now = new Date().getTime();
        const endTime = now + duration * 1000;

        const interval = setInterval(function () {
            const currentTime = new Date().getTime();
            const remainingTime = endTime - currentTime;

            if (remainingTime <= 0) {
                clearInterval(interval);
                countdownTime.textContent = '00:00';
                signInStateMachine = 2;
            } else {
                if (signInStateMachine == 0) {// 0状态，销毁计时器
                    clearInterval(interval);
                    signInInterface.classList.add('hide');
                    signInSelect.classList.remove('hide');
                } else if (signInStateMachine == 1) {
                    const minutes = Math.floor(remainingTime / 1000 / 60);
                    const seconds = Math.floor((remainingTime / 1000) % 60);
                    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                    countdownTime.textContent = formattedTime;
                } else if (signInStateMachine == 2) {
                    clearInterval(interval);
                    signInInterface.classList.add('hide');
                    signInResult.classList.remove('hide');
                    signInFinished();
                }
            }
        }, 1000);
    }


    updateQRCodeSignInContinuing(duration, frequency);
}
// debug测试用的功能
// 以后会改，尤其是处理网址，加密等等
function updateQRCodeSignInContinuing(duration, frequency) {
    var code = '1234567890';
    var imagePath = './www/img/qrcode/qrcode_signIn_students.png'; // 相对于main.js的path

    var interval = setInterval(function () {
        window.ipcRenderer.send('generateQRCode', imagePath, code);
    }, frequency * 1000);

    // 在指定的持续时间之后清除定时器
    setTimeout(function () {
        clearInterval(interval); // 清除定时器
    }, duration * 1000);
    
}


// 签到结束
// (unfinished) 
function signInFinished() {
    var signInSelect = document.getElementById('signIn-select');
    var signInInterface = document.getElementById('signIn-interface');
    var signInResult = document.getElementById('signIn-result');

    var signInReturnBtn = document.getElementById('signIn-return-btn');

    signInReturnBtn.addEventListener('click', function () {
        signInResult.classList.add('hide');
        signInSelect.classList.remove('hide');
    });
}

// ==================================================
// 点名
// rollCall(点名)
// ==================================================
function updateRollCall() {

}


// ==================================================
// 随机抽问
// randomSelection(随机抽问)
// ==================================================
function updateRandomSelection() {
    updateInputTangeRandomSelection();
}
function updateInputTangeRandomSelection() {
    // 初始化
    var randomSelectionCountInput = document.getElementById('randomSelection-count-input');
    var randomSelectionCountLabel = document.getElementById('randomSelection-count-label');
    randomSelectionCountLabel.textContent = randomSelectionCountInput.value;
    // 持续
    randomSelectionCountInput.addEventListener('input', function () {
        randomSelectionCountLabel.textContent = randomSelectionCountInput.value;
    });
}

// ==================================================
// 通知
// message(通知)
// ==================================================
function updateMessage() {

}

// ==================================================
// 壁纸
// wallpaper(壁纸)
// ==================================================
function updateWallpaper() {

}