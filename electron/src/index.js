
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
    var sidebar = document.getElementById('sidebar');
    var folderMenuSidebarBottom = document.getElementById('folder-menu-sidebarBottom');
    folderMenuSidebarBottom.addEventListener('click', function(){
        // 隐藏元素
        var hideableElements = sidebar.querySelectorAll('.hide-able');
        hideableElements.forEach(function(element){
            element.classList.toggle('hide');
        });
        // 调整间距
        

        var resizableElements = sidebar.querySelectorAll('.resizable');
        resizableElements.forEach(function(element){
            if (element.classList.contains('mx-10')) {
                element.classList.remove('mx-10');
                element.classList.add('re-mx-10');
                // sidebar设为70px，防止折叠时又一次收缩
                // 但还是会收缩（折叠时最宽是66px，但不知为何会伸缩）
                // 遂，还改为66px，给`#sidebar-top`添加css，min-width: 66px
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

    
    // sidebar的btns点击，切换颜色，粗细等等
    // (unfinished)
    // htmlElement已在'切换主题模式'中var
    var clickableSidebarElement = sidebar.querySelectorAll('.clickable');
    clickableSidebarElement.forEach(function(element) {
        // element是each clickable元素
        element.addEventListener('click', function() {
            // 对全部操作
            clickableSidebarElement.forEach(function(item) {
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
                
                if(htmlElement.classList.contains('dark')){
                    // (DARK mode)
                    // 改的是light mode的图片
                    // 因为dark mode懒得做单独的颜色，用css改的
                    // 要切换到light mode时，未选中的颜色改为黑色
                    if(originalSrc.includes('9013fe')){
                        imgElement.src = originalSrc.replace('/9013fe/', '/333/');
                    }
                }else{
                    // (LIGHT mode)
                    if(originalSrc.includes('9013fe')){
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
            
            if(htmlElement.classList.contains('dark')){
                // (DARK mode)
                if(originalSrc.includes('333')){
                    thisImg.src = originalSrc.replace('/333/', '/9013fe/');
                }
            }else{
                // (LIGHT mode)
                if(originalSrc.includes('333')){
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

    // 


});

// 函数

