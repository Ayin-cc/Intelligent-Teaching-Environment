package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.CallStuService;

@RestController
@RequestMapping("/CallStu")
public class CallStuContoller {
    @Autowired
    private CallStuService callStuService;

    // 随机点名接口
    @RequestMapping("/random")
    public void random(@RequestBody String type, String set, String cid, String sid){
        if(type.equals("call")){
            if(set.equals("random")){
                callStuService.random(cid);
            }
            else{
                callStuService.select(cid, sid);
            }
        }
        else{
            System.out.println("请求信息错误！");
        }
    }

    // 直接点名接口
    @RequestMapping("/select")
    public void select(@RequestBody String type, String set, String cid, String sid){
        if(type.equals("call")){
            if(set.equals("select")){
                callStuService.select(cid, sid);
            }
            else{
                callStuService.random(cid);
            }
        }
        else{
            System.out.println("请求信息错误！");
        }
    }

}
