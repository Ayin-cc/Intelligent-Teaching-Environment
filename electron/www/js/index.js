// 全局变量
var isLogin = 0;
var isClassPeriod = 0;
var isClassStarted = 0;
// 课程表
var currentSection = 0; // 在updateHomepageScheduleDisplay()中，下课切换回'0'有'1分钟'延时 可以Ctrl+f 查找'1 * 60 *1000'
var scheduleHomepageFlag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // 1为无课 0为有课s
var continuousClasses = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; // （还有，不包括现在）0为无 1为一节课 2为连续两节……  // 比如1~3的微积分[2,1,0,……]
var studentAnswersNum = []; // 在initializeSignIn()中定义的数组，若不为[]，则-1表示缺勤，0表示到但未回答问题，1,2,3……表示回答次数

var initializeData = null;
var saveData = null;
var students = null;
var chatMessage = null;

// ==================================================
// 当纯 HTML 被完全加载以及解析时
// ==================================================
document.addEventListener("DOMContentLoaded", function () {

    // 消除选择(单击任意地方3秒后，清除选择)
    // (done)
    // var clickTimeout;
    // document.addEventListener("click", function () {
    //     if (clickTimeout) {
    //         clearTimeout(clickTimeout);
    //     }

    //     clickTimeout = setTimeout(function () {
    //         if (window.getSelection) {
    //             var selection = window.getSelection();
    //             selection.removeAllRanges();
    //         }
    //     }, 3000); // 3s
    // });

    // 初始化wed
    initializeWeb();
    // web的刷新
    updateWeb();
    // homepage的刷新
    updateHomepage();
    // signIn的刷新
    updateSignIn();
    updateRollCall();
    updateRandomSelection();
    updateMessage();
    updateCommunication();

});

// *************************
// *    函数
// *    一般放在DOMContentLoaded监听触发后
// *************************

// ==================================================
// 初始化
// ==================================================
function initializeWeb() {
    initializeStaticData()
    initializeSave();
}
// 初始化静态数据
function initializeStaticData() {
    // 相对路径默认目录为www（index.html决定的吗？）
    fetch('./data/data.json')
        .then(response => response.json())
        .then(data => {
            initializeData = data;
            // 在这里可以操作获取到的 JSON 数据
        })
        .catch(error => {
            // 处理错误
            console.error('读取 JSON 文件时出错：', error);
        });

}
// 初始化动态数据
// 尚未请求数据
// 读取数据
// (unfinished)
function initializeSave() {
    // 
    fetch('./save/courses.json')
        .then(response => response.json())
        .then(data => {
            console.log('courses.json:');
            console.log(data)
            saveData = data;
            // 在这里可以操作获取到的 JSON 数据 
            initializeSaveHomepage()

        })
        .catch(error => {
            // 处理错误
            console.error('初始化动态数据出错：' + ' 获取课程信息时出错/n', error);
        });
    // 
    fetch('./save/chatMessage.json')
        .then(response => response.json())
        .then(data => {
            console.log('chatMessage.json:');
            console.log(data)
            chatMessage = data;
            // 在这里可以操作获取到的 JSON 数据 
            initializeSaveHomepage()

        })
        .catch(error => {
            // 处理错误
            console.error('初始化动态数据出错：' + ' 获取交流消息时出错/n', error);
        });

}
function initializeSaveHomepage() {
    var courseCount = saveData.length;
    var scheduleHomepageDetail = $('#schedule-homepage').children().eq(0).children();
    for (var i = 0; i < courseCount; i++) {
        var startSection = saveData[i]['startSection'];
        var endSection = saveData[i]['endSection'];
        for (var j = (startSection - 1); j < (endSection); j++) {
            scheduleHomepageFlag[j] = 1;
            scheduleHomepageDetail.eq(j).children().eq(1).text(saveData[i]['name']);
            scheduleHomepageDetail.eq(j).children().eq(3).text(saveData[i]['teacher']);
        }
        var continuousCount = endSection - startSection;
        for (var j = continuousCount; j > 0; j--) {
            continuousClasses[endSection - j - 1] = j;
        }

    }
    for (var i = 0; i < 12; i++) {
        if (scheduleHomepageFlag[i] == 0) {
            scheduleHomepageDetail.eq(i).children().eq(1).text('无课程');
            scheduleHomepageDetail.eq(i).children().eq(3).text('无');
        }
    }
}

// ==================================================
// 动态更新网页
// ==================================================
function updateWeb() {
    webListener();
}
// 主要监听事件
function webListener() {
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


    // 创建次要窗口

    var aboutMenuHeader = document.getElementById('about-menu-header');
    var settingMenuHeader = document.getElementById('setting-menu-header');
    var aboutSidebarSelfExtra = document.getElementById('about-sidebar-self-extra');
    var settingSidebarSelfExtra = document.getElementById('setting-sidebar-self-extra');

    aboutMenuHeader.addEventListener('click', function () {
        window.ipcRenderer.send('aboutWindow', 'create-window');
    });
    aboutSidebarSelfExtra.addEventListener('click', function () {
        window.ipcRenderer.send('aboutWindow', 'create-window');
    });
    settingMenuHeader.addEventListener('click', function () {
        window.ipcRenderer.send('settingWindow', 'create-window');
    });
    settingSidebarSelfExtra.addEventListener('click', function () {
        window.ipcRenderer.send('settingWindow', 'create-window');
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

        var sidebarSelfExtra = document.getElementById('sidebar-self-extra');
        if (sidebarSelfExtra.style.left != '10px') {
            sidebarSelfExtra.style.left = '10px';
        } else {
            sidebarSelfExtra.style.left = '200px';
        }

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
                    // 该界面
                    hideableElement.classList.remove('hide');
                } else {
                    // 其他界面
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
                item.classList.remove('bg-purple-100');
                item.classList.remove('hover:bg-puple-200');
                item.classList.remove('before:bg-purple-600');
                item.classList.add('hover:bg-white');
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
            this.classList.remove('hover:bg-white');
            this.classList.remove('before:bg-slate-200');
            this.classList.remove('before:hover:bg-slate-400');
            this.classList.add('bg-purple-100');
            this.classList.add('hover:bg-purple-200');
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
    // 立即更新课程表信息
    updateHomepageSchedule()
    // 立即更新一次
    updateHomepageDateTime(); // 时间
    updateHomepageGreeting(); // 问候语
    updateHomepageScheduleDisplay(); // 课程
    classStartHomepage(); // 开始上课
    // 持续性
    // 每秒钟更新一次时间
    setInterval(function () {
        updateHomepageDateTime();
        updateHomepageGreeting();
        updateHomepageScheduleDisplay()
    }, 1000);


}
// 初始化时调用 注意设置某个时间段
// unfinished
function updateHomepageSchedule() {

}

// 
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
    var currentMinute = new Date().getMinutes();
    if (currentHour >= 5 && currentHour < 7) {
        greetingHomepage.textContent = "清晨好！一日之计在于晨!";
    } else if (currentHour >= 7 && currentHour < 12) {
        greetingHomepage.textContent = "上午好！新的一天开始了!";
    } else if (currentHour >= 12 && (currentHour < 13 || (currentHour == 13 && currentMinute < 50))) {
        greetingHomepage.textContent = "中午好！是时候休息一下啦。";
    } else if ((currentHour == 13 && currentMinute >= 50 || currentHour > 13) && (currentHour < 18 || (currentHour == 18 && currentMinute < 25))) { // 13:50-18:25
        greetingHomepage.textContent = "下午好！继续加油努力吧!";
    } else if (((currentHour = 18 && currentMinute >= 25) || currentHour > 18) && currentHour < 21) { // 18:25-21:00?
        greetingHomepage.textContent = "傍晚好！夕阳的余晖让一切都变得温暖。";
    } else if (currentHour >= 21 && currentHour < 23) {
        greetingHomepage.textContent = "晚上好！夜晚是创意和思考的好时机。";
    } else if (currentHour >= 23 || currentHour < 5) {
        greetingHomepage.textContent = "夜深了，早点休息。";
    }
}
// 更新当前展示课程及上课状态(jQuery)
function updateHomepageScheduleDisplay() {
    var scheduleHomepage = $('#schedule-homepage').children();
    var scheduleHomepageChiledren = scheduleHomepage.children();
    var currentHour = new Date().getHours();
    var currentMinute = new Date().getMinutes();
    // 方框时间段中

    if (currentHour == 8 && currentMinute >= 15) { // 8:15-9:00 上午
        scheduleHomepageChiledren.eq(0).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(0).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 0) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(1).removeClass('hide');
        scheduleHomepageChiledren.eq(2).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 1;
    } else if ((currentHour == 9 && currentMinute >= 10 || currentHour > 9) && (currentHour < 9 || (currentHour == 9 && currentMinute < 55))) { // 9:10-9:55
        scheduleHomepageChiledren.eq(1).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(1).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 1) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(2).removeClass('hide');
        scheduleHomepageChiledren.eq(3).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 2;
    } else if ((currentHour >= 10 && currentMinute >= 15) && (currentHour < 11)) { // 10:15-11:00
        scheduleHomepageChiledren.eq(2).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(2).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 2) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(3).removeClass('hide');
        scheduleHomepageChiledren.eq(4).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 3;
    } else if ((currentHour == 11 && currentMinute >= 10 || currentHour > 11) && (currentHour < 11 || (currentHour == 11 && currentMinute < 55))) { // 11:10-11:55
        scheduleHomepageChiledren.eq(3).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(3).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 3) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(4).removeClass('hide');
        scheduleHomepageChiledren.eq(5).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 4;
    } else if ((currentHour == 13 && currentMinute >= 50 || currentHour > 13) && (currentHour < 14 || (currentHour == 14 && currentMinute < 35))) { // 13:50-14:35 下午
        scheduleHomepageChiledren.eq(4).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(4).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 4) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(5).removeClass('hide');
        scheduleHomepageChiledren.eq(6).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 5;
    } else if ((currentHour == 14 && currentMinute >= 45 || currentHour > 14) && (currentHour < 15 || (currentHour == 15 && currentMinute < 30))) { // 14:45-15:30
        scheduleHomepageChiledren.eq(5).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(5).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 5) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(6).removeClass('hide');
        scheduleHomepageChiledren.eq(7).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 6;
    } else if ((currentHour == 15 && currentMinute >= 40 || currentHour > 15) && (currentHour < 16 || (currentHour == 16 && currentMinute < 25))) { // 15:40-16:25
        scheduleHomepageChiledren.eq(6).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(6).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 6) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(7).removeClass('hide');
        scheduleHomepageChiledren.eq(8).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 7;
    } else if ((currentHour == 16 && currentMinute >= 45 || currentHour > 16) && (currentHour < 17 || (currentHour == 17 && currentMinute < 30))) { // 16:45-17:30
        scheduleHomepageChiledren.eq(7).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(7).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 7) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(8).removeClass('hide');
        scheduleHomepageChiledren.eq(9).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 8;
    } else if ((currentHour == 17 && currentMinute >= 40 || currentHour > 17) && (currentHour < 18 || (currentHour == 18 && currentMinute < 25))) { // 17:40-18:25
        scheduleHomepageChiledren.eq(8).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(8).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 8) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(9).removeClass('hide');
        scheduleHomepageChiledren.eq(10).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 9;
    } else if ((currentHour == 19 && currentMinute >= 20 || currentHour > 19) && (currentHour < 20 || (currentHour == 20 && currentMinute < 5))) { // 19:20-20:05 晚上
        scheduleHomepageChiledren.eq(9).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(9).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 9) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(10).removeClass('hide');
        scheduleHomepageChiledren.eq(11).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 10;
    } else if (currentHour == 20 && currentMinute >= 15) { // 20:15-21:00
        scheduleHomepageChiledren.eq(10).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(10).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 10) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(11).removeClass('hide');
        scheduleHomepageChiledren.eq(12).removeClass('hide');
        isClassPeriod = 1;
        currentSection = 11;
    } else if ((currentHour == 21 && currentMinute >= 10 || currentHour > 21) && (currentHour < 21 || (currentHour == 21 && currentMinute < 55))) { // 21:10-21:55
        scheduleHomepageChiledren.eq(11).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(11).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 11) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(12).removeClass('hide');
        currentSection = 12;
    } else if (((currentHour == 21 && currentMinute >= 55 || currentHour > 21) && (currentHour < 24)) || (currentHour >= 0 && currentHour < 5)) { // 21:55-24:00 || 0:00-5:00
        scheduleHomepageChiledren.eq(12).addClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
        scheduleHomepageChiledren.eq(12).removeClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        for (var i = 0; ((i != 12) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        isClassPeriod = 0;
        currentSection = 0;

    }// 方框时间外
    else if (currentHour >= 5 && (currentHour < 8 || (currentHour == 8 && currentMinute < 15))) { // 5:00-8:15
        scheduleHomepageChiledren.eq(0).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(0).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 0) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(1).removeClass('hide');
        scheduleHomepageChiledren.eq(2).removeClass('hide');
        isClassPeriod = 0;
        currentSection = 0;
    } else if (currentHour == 9 && currentMinute < 10) { // 9:00-9:10
        scheduleHomepageChiledren.eq(1).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(1).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 1) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(2).removeClass('hide');
        scheduleHomepageChiledren.eq(3).removeClass('hide');
        isClassPeriod = 0;

    } else if ((currentHour == 9 && currentMinute >= 55) || (currentHour == 10 && currentMinute < 15)) {// 9:55-10:15
        scheduleHomepageChiledren.eq(2).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(2).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 2) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(3).removeClass('hide');
        scheduleHomepageChiledren.eq(4).removeClass('hide');
        isClassPeriod = 0;

    } else if ((currentHour == 11 && currentMinute >= 0 || currentHour > 11) && (currentHour < 11 || (currentHour == 11 && currentMinute < 10))) { // 11:00-11:10
        scheduleHomepageChiledren.eq(3).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(3).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 3) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(4).removeClass('hide');
        scheduleHomepageChiledren.eq(5).removeClass('hide');
        isClassPeriod = 0;

    } else if ((currentHour == 11 && currentMinute >= 55 || currentHour > 11) && (currentHour < 13 || (currentHour == 13 && currentMinute < 50))) { // 11:55-13:50
        scheduleHomepageChiledren.eq(4).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(4).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 4) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(5).removeClass('hide');
        scheduleHomepageChiledren.eq(6).removeClass('hide');
        isClassPeriod = 0;

    } else if ((currentHour == 14 && currentMinute >= 35 || currentHour > 14) && (currentHour < 14 || (currentHour == 14 && currentMinute < 45))) { // 14:35-14:45
        scheduleHomepageChiledren.eq(5).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(5).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 5) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(6).removeClass('hide');
        scheduleHomepageChiledren.eq(7).removeClass('hide');
        isClassPeriod = 0;

    } else if ((currentHour == 15 && currentMinute >= 30 || currentHour > 15) && (currentHour < 15 || (currentHour == 15 && currentMinute < 40))) { // 15:30-15:40
        scheduleHomepageChiledren.eq(6).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(6).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 6) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(7).removeClass('hide');
        scheduleHomepageChiledren.eq(8).removeClass('hide');
        isClassPeriod = 0;

    } else if ((currentHour == 16 && currentMinute >= 25 || currentHour > 16) && (currentHour < 16 || (currentHour == 16 && currentMinute < 45))) { // 16:25-16:45
        scheduleHomepageChiledren.eq(7).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(7).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 7) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(8).removeClass('hide');
        scheduleHomepageChiledren.eq(9).removeClass('hide');
        isClassPeriod = 0;

    } else if ((currentHour == 17 && currentMinute >= 30 || currentHour > 17) && (currentHour < 17 || (currentHour == 17 && currentMinute < 40))) { // 17:30-17:40
        scheduleHomepageChiledren.eq(8).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(8).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 8) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(9).removeClass('hide');
        scheduleHomepageChiledren.eq(10).removeClass('hide');
        isClassPeriod = 0;

    } else if ((currentHour == 18 && currentMinute >= 25 || currentHour > 18) && (currentHour < 19 || (currentHour == 19 && currentMinute < 20))) { // 18:25-19:20
        scheduleHomepageChiledren.eq(9).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(9).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 9) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(10).removeClass('hide');
        scheduleHomepageChiledren.eq(11).removeClass('hide');
        isClassPeriod = 0;
        isClassPeriod = 0;

    } else if ((currentHour == 20 && currentMinute >= 5 || currentHour > 20) && (currentHour < 20 || (currentHour == 20 && currentMinute < 15))) { // 20:05-20:15
        scheduleHomepageChiledren.eq(10).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(10).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 10) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(11).removeClass('hide');
        scheduleHomepageChiledren.eq(12).removeClass('hide');
        isClassPeriod = 0;

    } else if ((currentHour == 21 && currentMinute >= 0 || currentHour > 21) && (currentHour < 21 || (currentHour == 21 && currentMinute < 10))) { // 21:00-21:10
        scheduleHomepageChiledren.eq(11).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700');
        scheduleHomepageChiledren.eq(11).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500 hide');
        for (var i = 0; ((i != 11) && i < scheduleHomepageChiledren.length); i++) {
            scheduleHomepageChiledren.eq(i).removeClass('bg-purple-200 hover:ring-2 hover:ring-purple-300 dark:bg-purple-700 dark:hover:ring-purple-500');
            scheduleHomepageChiledren.eq(i).addClass('bg-purple-50 hover:ring-1 hover:ring-purple-200 dark:bg-purple-900 dark:hover:ring-purple-700 hide');
        }
        scheduleHomepageChiledren.eq(12).removeClass('hide');
        isClassPeriod = 0;

    }
    var isClassPeriodHomepage = $('#isClassPeriod-homepage');
    if (isClassPeriod == 0) {
        isClassPeriodHomepage.text('现在还不是上课时间!');
    } else if (isClassPeriod == 1) {
        isClassPeriodHomepage.text('现在是上课时间段!');
    }



}
// 开始上课
// (unfinished)
function classStartHomepage() {
    var classStartBtnHomepage = document.getElementById('classStartBtn-homepage');
    var startClassHelpHomepage = document.getElementById('startClass-help-homepage');
    var unstartMasks = document.getElementsByClassName('unstart-mask');
    classStartBtnHomepage.addEventListener('click', function () {
        if (isClassStarted == 0) {
            isClassStarted = 1;
            classStartBtnHomepage.textContent = '下课';
            classStartBtnHomepage.classList.add('text-red-600');
            classStartBtnHomepage.classList.add('dark:text-red-300');
            classStartBtnHomepage.classList.remove('dark:text-zinc-300');

            startClassHelpHomepage.textContent = '在结束当次使用后，请点击"下课"';
            for (var i = 0; i < unstartMasks.length; i++) {
                unstartMasks[i].classList.add('hidden');
            }
            // 开启功能
            initializeSignIn();
            initializeRollCall();
            initializeRandomSelection();
            initializeCommunication();

        } else if (isClassStarted == 1) {
            isClassStarted = 0;
            classStartBtnHomepage.textContent = '上课';
            classStartBtnHomepage.classList.add('dark:text-zinc-300');
            classStartBtnHomepage.classList.remove('text-red-600');
            classStartBtnHomepage.classList.remove('dark:text-red-300');

            startClassHelpHomepage.textContent = '点击"上课"后，才能使用大部分功能';
            for (var i = 0; i < unstartMasks.length; i++) {
                unstartMasks[i].classList.remove('hidden');
            }

        }   // 关闭功能
    });

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
// 初始化，在"classStartHomepage()"中调用
function initializeSignIn() {
    // 目前有课
    if (scheduleHomepageFlag[currentSection - 1] == 1) {
        var courseCount = saveData.length;
        for (var i = 0; i < courseCount; i++) {
            var startSection = saveData[i]['startSection'];
            var endSection = saveData[i]['endSection'];
            if ((startSection <= currentSection) && (currentSection <= endSection)) {
                students = saveData[i]['students'];
                // 初始化变量
                // 定义学生回答次数
                if (saveData[i]['students'].length > 0) {
                    studentAnswersNum = new studentAnswersNumay(saveData[i]['students'].length).fill(-1);
                } else {
                    studentAnswersNum = new studentAnswersNumay(1).fill(-1);
                }
                updateSignInList(students)
            }
        }
    } else { // 目前没课
        var signInDisplay = $('#signIn-display');
        signInDisplay.empty();
        var newElements = '';
        var studentBefore = `<div class="flex p-1 m-1 w-48 h-max rounded-xl items-center bg-zinc-200 bg-opacity-70 hover:shadow-zinc-300 hover:shadow-md dark:bg-zinc-800 dark:ring-zinc-500 dark:hover:ring-4 dark:hover:shadow-none dark:hover:ring-red-700"><div class="flex flex-col p-3 w-full rounded-lg items-center bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"><div class="flex w-full h-8 items-center relative"><div class="flex max-w-full min-w-full py-1 px-2 rounded-lg truncate hover:absolute hover:ring-1 hover:ring-red-400 hover:max-w-max hover:z-50 hover:left-0 hover:bg-zinc-200 bg-opacity-100 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:ring-zinc-500"><div class="flex flex-grow"></div><div class="flex select-all">`
        var studentMiddle = `</div><div class="flex flex-grow"></div></div></div><div class="flex w-full justify-center text-sm text-zinc-700 dark:text-red-400 select-all">`
        var studentAfter = `</div></div></div>`
        var newElement = studentBefore + '没有检测到学生' + studentMiddle + '提醒消息' + studentAfter;
        newElements += newElement;
        signInDisplay.append(newElements);
    }
}
function updateSignInList(students) {
    var newElements = '';
    // 定义标签
    var studentBefore = `<div class="flex p-1 m-1 w-48 h-max rounded-xl items-center bg-zinc-200 bg-opacity-70 hover:shadow-zinc-300 hover:shadow-md dark:bg-zinc-800 dark:ring-zinc-500 dark:hover:ring-4 dark:hover:shadow-none dark:hover:ring-red-700"><div class="flex flex-col p-3 w-full rounded-lg items-center bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"><div class="flex w-full h-8 items-center relative"><div class="flex max-w-full min-w-full py-1 px-2 rounded-lg truncate hover:absolute hover:ring-1 hover:ring-red-400 hover:max-w-max hover:z-50 hover:left-0 hover:bg-zinc-200 bg-opacity-100 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:ring-zinc-500"><div class="flex flex-grow"></div><div class="flex select-all">`
    var studentMiddle = `</div><div class="flex flex-grow"></div></div></div><div class="flex w-full justify-center text-sm text-zinc-700 dark:text-red-400 select-all">`
    var studentAfter = `</div></div></div>`

    var studentNum = students.length;
    for (var i = 0; i < studentNum; i++) {
        var studentName = students[i]['name'];
        var studentId = students[i]['sid'];
        var newElement = studentBefore + studentName + studentMiddle + studentId + studentAfter;
        newElements += newElement;
    }
    // 先清空，再添加
    var signInDisplay = $('#signIn-display');
    signInDisplay.empty();
    signInDisplay.append(newElements);
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
    // 开始签到
    var signInStartBtn = document.getElementById('signIn-start-btn');
    var signInSelect = document.getElementById('signIn-select');
    var signInInterface = document.getElementById('signIn-interface');
    signInStartBtn.addEventListener('click', function () {
        signInSelect.classList.add('hide');
        signInInterface.classList.remove('hide');
        signInStateMachine = 1;
        signInContinuing();// 签到持续中
    });
    // 查看教室信息
    var aboutSignIn = document.getElementById('about-signIn');
    aboutSignIn.addEventListener('click', function () {
        window.ipcRenderer.send('aboutWindow', 'create-window');
    });
    // 查看数据
    var checkResultSignIn = document.getElementById('checkResult-signIn');
    var signInSelect = document.getElementById('signIn-select');
    var signInResult = document.getElementById('signIn-result');
    checkResultSignIn.addEventListener('click', function () {
        signInSelect.classList.add('hide');
        signInResult.classList.remove('hide');
        signInFinished();
    });
}
// 签到中
// (unfinished)
// 没有获取学生信息，没有已签到学生数量、学生总数。遂只设置初始数据
function signInContinuing() {

    var signInSelect = document.getElementById('signIn-select');
    var signInInterface = document.getElementById('signIn-interface');
    var signInResult = document.getElementById('signIn-result');

    if (signInStateMachine == 1) {
        // 返回
        var signInRestartBtn = document.getElementById('signIn-reset-btn');
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
            duration = signInDurationInput.value;
            frequency = signInFrequencyInput.value;
        }
        // 没有获取学生信息，没有已签到学生数量、学生总数。遂只设置初始数据（unfinished）
        var totalCount = 50;
        var signedCount = 0;

        var countdownTime = document.getElementById('countdown-signIn');
        var signedInCountToplimitSignIn = document.getElementById('signedInCount-toplimit-signIn');
        var countdownToplimitSignIn = document.getElementById('countdown-toplimit-signIn');

        signedInCountToplimitSignIn.textContent = String(totalCount);
        countdownToplimitSignIn.textContent = duration < 10 ? ('0' + String(duration) + ':00') : (String(duration) + ':00');
        countdownTime.textContent = duration < 10 ? ('0' + String(duration) + ':00') : (String(duration) + ':00');


        duration *= 60; // 分->秒
        // 持续性改变消息
        // 倒计时

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
    window.ipcRenderer.send('generateQRCode', imagePath, code, duration, frequency);
    // 是否放大
    var qrcodeContainer = document.getElementById('qrcode-container');
    qrcodeContainer.addEventListener('click', function () {
        window.ipcRenderer.send('QRCodeWindow', 'create-window');
    });
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
// 初始化，在"classStartHomepage()"中调用
function initializeRollCall() {
    // 目前有课
    if (scheduleHomepageFlag[currentSection - 1] == 1) {
        var courseCount = saveData.length;
        for (var i = 0; i < courseCount; i++) {
            var startSection = saveData[i]['startSection'];
            var endSection = saveData[i]['endSection'];
            if ((startSection <= currentSection) && (currentSection <= endSection)) {
                students = saveData[i]['students'];
                updateRollCallList(students)
            }
        }
    } else { // 目前没课
        var rollCallResult = $('#rollCall-result');
        rollCallResult.empty();
        var newElements = '';
        var beforeStudentName = `<div class="flex p-1 m-1 w-48 h-max rounded-xl items-center bg-zinc-200 bg-opacity-70 hover:shadow-zinc-300 hover:shadow-md dark:bg-zinc-800 dark:ring-zinc-500 dark:hover:ring-2 dark:hover:shadow-none"><div class="flex p-3 w-full rounded-lg items-center bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"><div class="flex p-1 w-28 rounded-md text-lg text-zinc-800 truncate hover:overflow-visible hover:min-w-max hover:bg-zinc-200 bg-opacity-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 hover:ring-1 ring-zinc-500 hover:z-50 hover:absolute">`
        var afterStudentName = `</div><div class="flex flex-grow"></div><div class="flex w-0.5 h-5 bg-zinc-500 bg-opacity-50 dark:bg-zinc-300"></div><div class="flex flex-row-reverse min-w-max w-6 h-9 pl-2 items-center text-red-700 dark:text-red-800">`
        var afterAnswerCount = `</div></div></div>`
        var newElement = beforeStudentName + '提醒消息：没有检测到当前的学生' + afterStudentName + '无' + afterAnswerCount;
        newElements += newElement;
        rollCallResult.append(newElements);



    }
}
function updateRollCallList(students) {
    var newElements = '';
    // 定义名字前后的标签
    var absent_1st = `<div class="flex p-1 m-1 w-48 h-max rounded-xl items-center bg-zinc-200 bg-opacity-70 hover:shadow-zinc-300 hover:shadow-md dark:bg-zinc-800 dark:ring-zinc-500 dark:hover:ring-2 dark:hover:shadow-none"><div class="flex p-3 w-full rounded-lg items-center bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"><div class="flex p-1 w-28 rounded-md text-lg text-zinc-800 truncate hover:overflow-visible hover:min-w-max hover:bg-zinc-200 bg-opacity-100 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 hover:ring-1 ring-zinc-500 hover:z-50 hover:absolute">`;
    var absent_2nd = `</div><div class="flex flex-grow"></div><div class="flex w-0.5 h-5 bg-zinc-500 bg-opacity-50 dark:bg-zinc-300"></div><div class="flex flex-row-reverse min-w-max w-6 h-9 pl-2 items-center text-red-700 dark:text-red-800">`;
    var absent_3rd = `</div></div></div>`; // -1
    var notAnswered_1st = `<div class="flex p-1 m-1 w-48 h-max rounded-xl items-center bg-purple-200 bg-opacity-70 ring-1 ring-purple-500 hover:shadow-purple-300 hover:shadow-md dark:bg-zinc-600 dark:ring-2 dark:ring-zinc-500 dark:hover:ring-4 dark:hover:shadow-none"><div class="flex p-3 w-full rounded-lg items-center bg-purple-200 dark:bg-zinc-700 dark:hover:bg-zinc-800"><div class="flex p-1 w-28 rounded-md text-lg text-zinc-800 truncate hover:overflow-visible hover:min-w-max hover:bg-purple-200 bg-opacity-100 dark:text-zinc-300 dark:hover:bg-zinc-800 hover:ring-1 ring-zinc-500 hover:z-50 hover:absolute">`;
    var notAnswered_2nd = `</div><div class="flex flex-grow"></div><div class="flex w-0.5 h-9 p-2 bg-purple-300"></div><div class="flex flex-row-reverse min-w-max w-6 h-9 pl-2 items-center font-bold text-blue-600 dark:text-blue-400">`;
    var notAnswered_3rd = `</div></div></div>`; // 0
    var answered_1st = `<div class="flex p-1 m-1 w-48 h-max rounded-xl items-center bg-purple-200 bg-opacity-100 hover:shadow-purple-300 hover:shadow-md dark:bg-zinc-600 dark:ring-zinc-500 dark:hover:ring-4 dark:hover:shadow-none"><div class="flex p-3 w-full rounded-lg items-center bg-purple-200 dark:bg-zinc-700 dark:hover:bg-zinc-800"><div class="flex p-1 w-28 rounded-md text-lg text-zinc-600 truncate hover:overflow-visible hover:min-w-max hover:bg-purple-200 bg-opacity-100 dark:text-zinc-400 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 hover:ring-1 ring-zinc-500 hover:z-50 hover:absolute">`;
    var answered_2nd = `</div><div class="flex flex-grow"></div><div class="flex w-0.5 h-5 bg-purple-500 bg-opacity-50"></div><div class="flex flex-row-reverse min-w-max w-6 h-9 pl-2 items-center text-zinc-600 dark:text-zinc-300">`;
    var answered_3rd = `</div></div></div>`; // >0
    // 元素生成
    var studentNum = students.length;
    for (var i = 0; i < studentNum; i++) {
        var studentName = students[i]['name'];
        var answerCount = studentAnswersNum[i] >= 0 ? String(studentAnswersNum[i]) : '缺勤';
        if (studentAnswersNum[i] == -1) { // 未签到
            newElement = absent_1st + studentName + absent_2nd + answerCount + absent_3rd;
        } else if (studentAnswersNum[i] == 0) { // 签到，未回答
            newElement = notAnswered_1st + studentName + notAnswered_2nd + answerCount + notAnswered_3rd;
        } else if (studentAnswersNum[i] > 0) { // 签到，已回答
            newElement = answered_1st + studentName + answered_2nd + answerCount + answered_3rd;
        }
        newElements += newElement;
    }
    // 先清空，再添加
    var rollCallResult = $('#rollCall-result');
    rollCallResult.empty();
    rollCallResult.append(newElements);
}

// ==================================================
// 随机抽问
// randomSelection(随机抽问)
// ==================================================
function updateRandomSelection() {
    updateInputTangeRandomSelection();
    randomSelectionStart();
}
// 初始化，在"classStartHomepage()"中调用

function initializeRandomSelection() {
    // 目前有课
    if (scheduleHomepageFlag[currentSection - 1] == 1) {
        var courseCount = saveData.length;
        for (var i = 0; i < courseCount; i++) {
            var startSection = saveData[i]['startSection'];
            var endSection = saveData[i]['endSection'];
            if ((startSection <= currentSection) && (currentSection <= endSection)) {
                $('#randomSelection-display').empty();
                updateRandomSelectionList('没有检测到学生', '初始化提醒')
            }
        }
    } else { // 目前没课
        $('#randomSelection-display').empty();
        updateRandomSelectionList('当前没有课', '提醒消息')
    }
}
// 添加到randomSelection-display中 的 末尾
// (unfinished)没有样式判断
function updateRandomSelectionList(studentName, answerCount) {
    var newElements = '';
    // 定义名字前后的标签

    var studentBefore = `<div class="flex p-1 m-1 w-48 h-max rounded-xl items-center bg-zinc-200 bg-opacity-70 hover:shadow-zinc-300 hover:shadow-md dark:bg-zinc-800 dark:ring-zinc-500 dark:hover:ring-4 dark:hover:shadow-none dark:hover:ring-red-700"><div class="flex flex-col p-3 w-full rounded-lg items-center bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800"><div class="flex w-full h-8 items-center relative"><div class="flex max-w-full min-w-full py-1 px-2 rounded-lg truncate hover:absolute hover:ring-1 hover:ring-red-400 hover:max-w-max hover:z-50 hover:left-0 hover:bg-zinc-200 bg-opacity-100 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:ring-zinc-500"><div class="flex flex-grow"></div><div class="flex select-all">`
    var studentMiddle = `</div><div class="flex flex-grow"></div></div></div><div class="flex w-full justify-center text-sm text-zinc-700 dark:text-red-400 select-all">`
    var studentAfter = `</div></div></div>`
    var newElement = studentBefore + studentName + studentMiddle + answerCount + studentAfter;
    newElements += newElement;
    $('#randomSelection-display').append(newElements);
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
function randomSelectionStart() {
    var count = 1;
    var priority = false;
    var randomSelectionStartBtn = document.getElementById('randomSelection-start-btn');
    randomSelectionStartBtn.addEventListener('click', function () {
        count = document.getElementById('randomSelection-count-input').value;
        priority = document.getElementById('randomSelection-priority-toggle').checked;
        randomSelectionDisplay(count, priority);
    });

}
// (unfinished)获取选择学生数量，结合签到or否，比较防超出，随机生成，记录回答次数
function randomSelectionDisplay(count, priority) {
    var randomSelectionSelect = document.getElementById('randomSelection-select');
    var randomSelectionResult = document.getElementById('randomSelection-result');
    // 清空
    $('#randomSelection-display').empty();
    randomSelectionSelect.classList.add('hide');
    randomSelectionResult.classList.remove('hide');

    // 具体抽取，然后修改html
    if (priority == true) { // 优先抽取未回答问题的同学
        // 最多抽取人数，以及记录'值为0'的'索引'
        var indices = [];
        for (let i = 0; i < studentAnswersNum.length; i++) {
            if (studentAnswersNum[i] == 0) {
                indices.push(i);
            }
        }
        var maxCount = indices.length;
        // 分情况生成
        if (maxCount == 0) {
            updateRandomSelectionList('没有未回答过的学生', '提醒消息')
        } else if (maxCount > 0) {
            // 获得抽取结果的"索引数组"
            var count = count > maxCount ? maxCount : count;
            var randomIndices = [];
            while (randomIndices.length < count) {
                const randomIndex = Math.floor(Math.random() * indices.length);
                randomIndices.push(indices[randomIndex]);
                indices.splice(randomIndex, 1);
            }
            for(var i = 0; i < randomIndices.length; i++){
                studentAnswersNum[i]++;
                updateRandomSelectionList(students[i]['name'], studentAnswersNum[i]);
            }
        }
    } else if (priority == false) {
        // 最多抽取人数，以及记录'值大于0'的'索引'
        var indices = [];
        for (let i = 0; i < studentAnswersNum.length; i++) {
            if (studentAnswersNum[i] >= 0) {
                indices.push(i);
            }
        }
        var maxCount = indices.length;
        // 分情况生成
        if (maxCount == 0) {
            updateRandomSelectionList('没有已签到的学生', '提醒消息')
        } else if (maxCount > 0) {
            // 获得抽取结果的"索引数组"
            var count = count > maxCount ? maxCount : count;
            var randomIndices = [];
            while (randomIndices.length < count) {
                const randomIndex = Math.floor(Math.random() * indices.length);
                randomIndices.push(indices[randomIndex]);
                indices.splice(randomIndex, 1);
            }
            for(var i = 0; i < randomIndices.length; i++){
                studentAnswersNum[i]++;
                updateRandomSelectionList(students[i]['name'], studentAnswersNum[i]);
            }
        }
    }

    var randomSelectionRestartBtn = document.getElementById('randomSelection-restart-btn');
    randomSelectionRestartBtn.addEventListener('click', function () {
        randomSelectionResult.classList.add('hide');
        randomSelectionSelect.classList.remove('hide');
        return; // 结束监听，微微优化
    });
}


// ==================================================
// 通知
// message(通知)
// ==================================================
function updateMessage() {
    // putMessageToWindows('Hello', 'The ITE is working!', './www/icons/message.png');
    clickMessage();
}
function initializeMessage() {

}
function putMessageToWindows(title, body, icon) {
    window.ipcRenderer.send('Notification', title, body, icon);
}
// 展开消息(jQuery)
function clickMessage() {

    var messageContainer = $('#message-container');
    var messages = messageContainer.children();
    messages.each(function () {
        $(this).on('click', function () {
            // 切换是否读过
            var element = $(this);
            var messageBody = element.children().eq(0);
            if (element.hasClass('importantNotice')) {
                if (element.hasClass('read')) {
                    // 无
                } else {
                    messageBody.addClass('read');
                    messageBody.children().eq(0).removeClass('bg-amber-300 hover:bg-amber-400 dark:bg-amber-600 dark:hover:bg-amber-500');
                    messageBody.children().eq(0).addClass('bg-amber-50 hover:bg-amber-100 dark:bg-zinc-800 dark:hover:bg-zinc-600');
                    messageBody.children().eq(0).find("img").attr("src", "./icons/333/已读邮件.svg");
                    messageBody.children().eq(1).removeClass('bg-red-500 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700');
                    messageBody.children().eq(1).addClass('bg-red-400 hover:bg-red-500 dark:bg-red-950 dark:hover:bg-red-800');
                    messageBody.children().eq(1).find("img").attr("src", "./icons/ffffff/消息.svg");
                }
            } else if (element.hasClass('commonNotice')) {
                if (element.hasClass('read')) {
                    // 无
                } else {
                    messageBody.addClass('read');
                    messageBody.children().eq(0).removeClass('bg-amber-300 hover:bg-amber-400 dark:bg-amber-600 dark:hover:bg-amber-500');
                    messageBody.children().eq(0).addClass('bg-amber-50 hover:bg-amber-100 dark:bg-zinc-800 dark:hover:bg-zinc-600');
                    messageBody.children().eq(0).find("img").attr("src", "./icons/333/已读邮件.svg");
                    messageBody.children().eq(1).removeClass('bg-orange-400 hover:bg-orange-600 dark:bg-orange-700 dark:hover:bg-orange-600');
                    messageBody.children().eq(1).addClass('bg-orange-200 hover:bg-orange-500 dark:bg-orange-900 dark:hover:bg-orange-800');
                    messageBody.children().eq(1).find("img").attr("src", "./icons/ffffff/消息.svg");
                }
            } else if (element.hasClass('publicizeNotice')) {
                if (element.hasClass('read')) {
                    // 无
                } else {
                    messageBody.addClass('read');
                    messageBody.children().eq(0).removeClass('bg-amber-300 hover:bg-amber-400 dark:bg-amber-600 dark:hover:bg-amber-500');
                    messageBody.children().eq(0).addClass('bg-amber-50 hover:bg-amber-100 dark:bg-zinc-800 dark:hover:bg-zinc-600');
                    messageBody.children().eq(0).find("img").attr("src", "./icons/333/已读邮件.svg");
                    messageBody.children().eq(1).removeClass('bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600');
                    messageBody.children().eq(1).addClass('bg-green-300 hover:bg-green-500 dark:bg-green-950 dark:hover:bg-green-800');
                    messageBody.children().eq(1).find("img").attr("src", "./icons/ffffff/消息.svg");
                }
            }

            // 点击后的，展开通知
            var detail = element.find('.message-detail');
            var title = element.find('.message-title');
            if (detail.hasClass('truncate')) {
                element.addClass('ring-inset ring ring-purple-200 dark:ring-zinc-700');
                detail.removeClass('truncate');
                detail.addClass('break-words');
                title.removeClass('truncate');
                title.addClass('break-words');
            } else {
                element.removeClass('ring-inset ring ring-purple-200 dark:ring-zinc-700');
                detail.addClass('truncate');
                detail.removeClass('break-words');
                title.removeClass('truncate');
                title.addClass('break-words');
            }
        });
    });

}


// ==================================================
// 交流
// communication(交流)
// ==================================================
function updateCommunication() {

}
// 初始化，在"classStartHomepage()"中调用
// (unfinished)
function initializeCommunication() {
    // 目前有课
    if (scheduleHomepageFlag[currentSection - 1] == 1) {
        var courseCount = saveData.length;
        for (var i = 0; i < courseCount; i++) {
            var startSection = saveData[i]['startSection'];
            var endSection = saveData[i]['endSection'];
            if ((startSection <= currentSection) && (currentSection <= endSection)) {
                updateCommunicationList()
            }
        }
    } else { // 目前没课
        var communicationDisplay = $('#communication-display').children(0);
        communicationDisplay.empty();
        var newElements = '';
        var timeBefore = `<div class="flex flex-col my-3 w-full communication-message-body"><div class="flex w-full justify-center text-zinc-600 text-sm dark:text-zinc-400">`;
        var studentBefore = `</div><div class="flex w-full"><div class="flex h-10 w-10 p-1 rounded-full items-center justify-center bg-purple-200 dark:bg-purple-700"><img draggable="false" class="h-8 w-8" src="./icons/333/人员.svg" alt="" srcset=""></div><div class="flex w-20-to-full flex-col ml-4"><div class="flex text-zinc-600 max-w-xl text-sm truncate dark:text-zinc-400 select-text">`;
        var messageBefore = `</div><div class="flex w-full"><div class="max-w-full p-4 rounded-xl bg-white dark:bg-zinc-900 dark:text-zinc-300 break-words select-text">`;
        var studentAfter = `</div></div></div></div></div>`;
        function getCurrentTime() {
            const now = new Date();
            const hours = now.getHours().toString(); // 获取小时，不确保两位数显示
            const minutes = now.getMinutes().toString().padStart(2, '0'); // 获取分钟，并确保两位数显示
            return `${hours}:${minutes}`;
        }
        var newElement = timeBefore + getCurrentTime() + studentBefore + '系统' + messageBefore + '当前无课' + studentAfter;
        newElements += newElement;

        communicationDisplay.append(newElements);
    }
}
function updateCommunicationList() {

}