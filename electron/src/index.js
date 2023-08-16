
// 当纯 HTML 被完全加载以及解析时
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

    // 顶部的folder点击，切换显示状态
    // (done)
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
    // 注意! 这个调整了很多东西
    // (done)
    var folderMenuSidebarBottom = document.getElementById('folder-menu-sidebarBottom');
    folderMenuSidebarBottom.addEventListener('click', function(){
        // 隐藏元素
        var sidebar = document.getElementById('sidebar');
        var hideableElements = sidebar.querySelectorAll('.hide-able');
        hideableElements.forEach(function(element){
            element.classList.toggle('hide');
        });
        // 调整间距
        // 因为sidebar最小是`66px`，防止折叠时又一次收缩

        var resizableElements = sidebar.querySelectorAll('.resizable');
        resizableElements.forEach(function(element){
            if (element.classList.contains('mx-10')) {
                element.classList.remove('mx-10');
                element.classList.add('re-mx-10');
                sidebar.style.width = '66px';
            }else if (element.classList.contains('re-mx-10')) {
                element.classList.remove('re-mx-10');
                element.classList.add('mx-10');
                sidebar.style.width = '16.666667%';
            }

            if (element.classList.contains('mx-8')){
                element.classList.remove('mx-8');
                element.classList.add('re-mx-8');
            }else if (element.classList.contains('re-mx-8')){
                element.classList.remove('re-mx-8');
                element.classList.add('mx-8');
            }

            if (element.classList.contains('ml-10')){
                element.classList.remove('ml-10');
                element.classList.add('re-ml-10');
                element.classList.add('ml-2');
            }else if (element.classList.contains('re-ml-10')){
                element.classList.remove('re-ml-10');
                element.classList.remove('ml-2');
                element.classList.add('ml-10');
            }

            if (element.classList.contains('p-4')){
                element.classList.remove('p-4');
                element.classList.add('p-2');
                element.classList.add('re-p-4');
            }else if (element.classList.contains('re-p-4')){
                element.classList.remove('re-p-4');
                element.classList.remove('p-2');
                element.classList.add('p-4');
            }
            
        });

    });

    // sidebar的"功能"按钮点击，切换折叠状态
    // (done)
    var functionSidebarBtn = document.getElementById('function-sidebar');
    functionSidebarBtn.addEventListener('click', function(){
        // 旋转图片
        var folderBtn = document.getElementById('folder-function-sidebar');
        var folderImg = folderBtn.querySelector('img');
        var imgTransform = window.getComputedStyle(folderImg).getPropertyValue('transform');
        if(imgTransform == 'none'){
            folderImg.style.transform = 'rotate(90deg)';
        }else{
            folderImg.style.transform = 'none';
        }
        // 隐藏元素
        var functionsSidebarBtn = document.getElementById('functions-sidebar');
        var hideableElements = functionsSidebarBtn.querySelectorAll('.foldable');
        hideableElements.forEach(function(element){
            element.classList.toggle('hide');
        });
        
    });

    // sidebar的btns点击，切换颜色，粗细等等
    // (unfinished)
    


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

