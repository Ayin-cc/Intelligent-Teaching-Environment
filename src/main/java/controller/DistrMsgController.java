package controller;

import entity.Message;
import entity.StatusCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import service.DistrMsgService;

import java.util.List;

@RestController
@RequestMapping("/DistrMsg")
public class DistrMsgController {
    @Autowired
    private DistrMsgService distrMsgService;

    // 教务端发布新消息接口
    @RequestMapping("/create")
    public ResponseEntity<StatusCode> create(@RequestBody @RequestParam("token") String token, Message message){
        if(distrMsgService.create(token, message)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    // 教室或学生端获取消息接口
    @RequestMapping("/keepAlive")
    public ResponseEntity<List<Message>> keepAlive(@RequestBody String id){
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        //List<Message> message = distrMsgService.keepAlive(id);
        //return new ResponseEntity<>(message, HttpStatus.OK);
    }

    // 附件下载接口
    @RequestMapping("/download")
    public ResponseEntity<MultipartFile> download(@RequestBody int id, String name){
        MultipartFile file = distrMsgService.download(id, name);
        return new ResponseEntity<>(file, HttpStatus.OK);
    }
}
