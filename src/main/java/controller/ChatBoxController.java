package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serve.ChatBoxService;

@RestController
@RequestMapping("/ChatBox")
public class ChatBoxController {
    @Autowired
    private ChatBoxService chatBoxService;

    // 加入课堂交流接口
    @RequestMapping("/join")
    public void join(){

    }

    // 发送消息接口
    @RequestMapping("/send")
    public void send(){

    }

}
