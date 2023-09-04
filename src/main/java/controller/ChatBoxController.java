package controller;

import entity.Chat;
import entity.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import service.ChatBoxService;

import java.util.List;

@RestController
@RequestMapping("/ChatBox")
public class ChatBoxController {
    @Autowired
    private ChatBoxService chatBoxService;

    // 发送消息接口
    @RequestMapping("/send")
    public ResponseEntity<StatusCode> send(@RequestBody Chat chat) {
        if(chatBoxService.send(chat)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    // 维持长连接
    @RequestMapping("/keepAlive")
    public ResponseEntity<List<Chat>> keepAlive(@RequestBody Chat chat){
        List<Chat> chats = chatBoxService.keepAlive(chat.getCid());
        return new ResponseEntity<>(chats, HttpStatus.OK);
    }

}
