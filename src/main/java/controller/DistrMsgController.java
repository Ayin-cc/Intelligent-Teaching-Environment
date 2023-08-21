package controller;

import entity.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serve.DistrMsgService;

@RestController
@RequestMapping("/DistrMsg")
public class DistrMsgController {
    @Autowired
    private DistrMsgService distrMsgService;

    // 教务端发布新消息接口
    @RequestMapping("/create")
    public void create(@RequestBody String type, Message message){
        if(type.equals("msg")){
            distrMsgService.create(message);
        }
        else{
            System.out.println("请求信息错误！");
        }
    }

    // 教室或学生端获取消息接口
    @RequestMapping("/get")
    public void get(@RequestBody String type){
        if(type.equals("init")){
            distrMsgService.get();
        }
        else{
            System.out.println("请求信息错误！");
        }
    }
}
