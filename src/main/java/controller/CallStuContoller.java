package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serve.CallStuService;

@RestController
@RequestMapping("/CallStu")
public class CallStuContoller {
    @Autowired
    private CallStuService callStuService;

    // 随机点名接口
    @RequestMapping("/random")
    public void random(){

    }

    // 直接点名接口
    @RequestMapping("/select")
    public void select(){

    }

}
