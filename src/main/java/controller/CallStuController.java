package controller;

import entity.CallStudent;
import entity.QRcode;
import entity.StatusCode;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.CallStuService;

import java.util.List;

@RestController
@CrossOrigin(value = "*", allowCredentials = "true")
@RequestMapping("/CallStu")
public class CallStuController {
    @Autowired
    private CallStuService callStuService;

    // 随机点名接口
    @RequestMapping("/random")
    public ResponseEntity<List<Student>> random(@RequestBody @CookieValue("token") String token, QRcode qRcode){
        List<Student> students = callStuService.random(token, qRcode.getCount(), qRcode.getUid());
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // 直接点名接口
    @RequestMapping("/select")
    public ResponseEntity<StatusCode> select(@RequestBody @CookieValue("token") String token, CallStudent callStudent){
        if(callStuService.select(token, callStudent.getId(), callStudent.getSid())){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

}
