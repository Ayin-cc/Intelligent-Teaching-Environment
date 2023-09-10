

window.addEventListener('DOMContentLoaded', () => {
    let btn_closeWindow = document.getElementsByClassName('btn-closeWindow')
    btn_closeWindow[0].addEventListener('click', function () {
        window.ipcRenderer.send('helpWindow_close','1')
    })
})