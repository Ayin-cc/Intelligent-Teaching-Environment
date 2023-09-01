package controller;

import entity.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.ChatBoxService;

@RestController
@RequestMapping("/ChatBox")
public class ChatBoxController {
    @Autowired
    private ChatBoxService chatBoxService;

    // 发送消息接口
    @RequestMapping("/send")
    public void send() {

    }

    // 维持长连接
    @RequestMapping("/keepAlive")
    public void keepAlive(){

    }

}
