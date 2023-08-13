document.addEventListener("DOMContentLoaded", function () {
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
        }, 3000); // 1000 milliseconds = 1 second
    });
});