var closeWindowBtn = document.getElementById('closeWindow-btn');

closeWindowBtn.addEventListener('click',function(){
    window.ipcRenderer.send('QRCodeWindow','closeWindow');
});