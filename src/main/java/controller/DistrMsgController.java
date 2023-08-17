package controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    public void create(){

    }

    // 教室或学生端获取消息接口
    @RequestMapping("/get")
    public void get(){

    }
}
