package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serve.QuesService;

import java.util.Queue;

@RestController
@RequestMapping("/Ques")
public class QuesController {
    @Autowired
    private QuesService quesService;

    // 发布问题接口
    @RequestMapping("/start")
    public void start(){

    }

    // 学生端抢答接口
    @RequestMapping("/rob")
    public void rob(){

    }

    // 学生端普通回答接口
    @RequestMapping("/answer")
    public void answer(){

    }

}
