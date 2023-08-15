
// 当纯 HTML 被完全加载以及解析时
document.addEventListener("DOMContentLoaded", function () {
    // 消除选择(单击任意地方3秒后，清除选择)
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

    // 顶部的folder点击，切换显示状态
    var folderMenuHeaderBtn = document.getElementById('folder-menu-header');
    folderMenuHeaderBtn.addEventListener('click', function(){
        // 旋转图片
        var folderImg = folderMenuHeaderBtn.querySelector('img');
        var imgTransform = window.getComputedStyle(folderImg).getPropertyValue('transform');
        if(imgTransform == 'none'){
            folderImg.style.transform = 'rotate(-90deg)';
        }else{
            folderImg.style.transform = 'none';
        }
        // 隐藏元素
        var menuHeader = document.getElementById('menu-header');
        var hideableElements = menuHeader.querySelectorAll('.hide-able');
        hideableElements.forEach(function(element){
            element.classList.toggle('hide');
        });
        
    });

    // sidebar(左边栏)的folder(底部的folder)点击，切换折叠状态
    var folderMenuSidebarBottom = document.getElementById('folder-menu-sidebarBottom');
    folderMenuSidebarBottom.addEventListener('click', function(){
        // 隐藏元素
        var sidebar = document.getElementById('sidebar');
        var hideableElements = sidebar.querySelectorAll('.hide-able');
        hideableElements.forEach(function(element){
            element.classList.toggle('hide');
        });
        // 调整间距
        // 因为没有改其中元素的margin、padding等，所以实际最小是`136px`
        sidebar.style.width = '130px';

    });

    // 切换主题模式
    var checkbox = document.getElementById("theme-toggle");
    var htmlElement = document.documentElement;
    checkbox.addEventListener("change", function () {
        var isChecked = checkbox.checked;
        if (isChecked) {
            console.log("已选中—darkMode");
            htmlElement.classList.toggle("dark");
        } else {
            console.log("未选中—lightMode");
            htmlElement.classList.toggle("dark");
        }
    });
});

// 函数

