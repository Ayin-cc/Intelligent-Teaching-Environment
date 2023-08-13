
document.addEventListener("DOMContentLoaded", function () {
    // 消除选择
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

    // 检查主题模式
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