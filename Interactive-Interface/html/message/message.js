var message = document.getElementsByClassName("message-box")[0].getElementsByClassName("message")

for(let i = 0 ; i < message.length; i++){
    message[i].addEventListener('click',function(){
        var message_content = message[i].getElementsByClassName('content')[0]
        if(message_content.style.whiteSpace == 'nowrap'){
            message_content.style.whiteSpace = 'normal'
            message[i].classList.add('active');
        }else{
            message_content.style.whiteSpace = 'nowrap'
            message[i].classList.remove('active');
        }
        
    })
}