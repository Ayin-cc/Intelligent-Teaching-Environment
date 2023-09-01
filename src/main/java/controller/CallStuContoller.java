package controller;

import entity.StatusCode;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import service.CallStuService;

import java.util.List;

@RestController
@RequestMapping("/CallStu")
public class CallStuContoller {
    @Autowired
    private CallStuService callStuService;

    // 随机点名接口
    @RequestMapping("/random")
    public ResponseEntity<List<Student>> random(@RequestBody @RequestParam("token") String token, int count, String uid){
        List<Student> students = callStuService.random(token, count, uid);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // 直接点名接口
    @RequestMapping("/select")
    public ResponseEntity<StatusCode> select(@RequestBody @RequestParam("token") String token, String id, String sid){
        if(callStuService.select(token, id, sid)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

}
