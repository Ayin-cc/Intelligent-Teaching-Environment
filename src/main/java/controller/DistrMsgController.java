package controller;

import entity.Attachment;
import entity.Message;
import entity.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import service.DistrMsgService;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin(value = "*", allowCredentials = "true")
@RequestMapping( "/DistrMsg")
public class DistrMsgController {
    @Autowired
    private DistrMsgService distrMsgService;

    // 教务端发布新消息接口
    @RequestMapping("/create")
    public ResponseEntity<StatusCode> create(@RequestHeader("Authorization") String token, @RequestParam("title")String title, @RequestParam("content")String content, @RequestParam("time")String time, @RequestParam("attachmentFiles")MultipartFile[] files){
        Message message = new Message();
        message.setTitle(title);
        message.setTime(time);
        message.setContent(content);
        message.setAttachmentFiles(Arrays.asList(files));
        System.out.println(message.toString());
        if(distrMsgService.create(token, message)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    // 教室或学生端获取消息接口
    @RequestMapping("/keepAlive")
    public ResponseEntity<List<Message>> keepAlive(){
        List<Message> message = distrMsgService.keepAlive();
        if(message.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 获取某条消息的具体内容
    @RequestMapping("/get")
    public ResponseEntity<Message> get(@RequestBody Message msg){
        Message message = distrMsgService.get(msg.getId());
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 附件下载接口
    @RequestMapping("/download")
    public ResponseEntity<Attachment> download(@RequestBody Attachment attachment){
        Attachment file = distrMsgService.download(attachment.getId(), attachment.getName());
        return new ResponseEntity<>(file, HttpStatus.OK);
    }
}
