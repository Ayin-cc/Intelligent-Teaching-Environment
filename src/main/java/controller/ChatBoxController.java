package controller;

import entity.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serve.ChatBoxService;

@RestController
@RequestMapping("/ChatBox")
public class ChatBoxController {
    @Autowired
    private ChatBoxService chatBoxService;

    // 发送消息接口
    @RequestMapping("/send")
    public void send(@RequestBody String type, Chat chat){
        if(type.equals("chat")){
            chatBoxService.send(chat);
        }
        else{
            System.out.println("请求信息错误！");
        }
    }

}
