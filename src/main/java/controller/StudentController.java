package controller;

import dao.UserDao;
import entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.StudentService;
import service.UserService;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(value = "*", allowCredentials = "true")
@RequestMapping("/Student")
public class StudentController {
    @Autowired
    private StudentService studentService;
    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public ResponseEntity<StatusCode> login(@RequestBody Student student){
        if(studentService.login(student)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/register")
    public ResponseEntity<StatusCode> register(@RequestBody Student student){
        int code = studentService.register(student);
        return new ResponseEntity<>(new StatusCode(code), HttpStatus.OK);
    }

    @RequestMapping("/getObj")
    public ResponseEntity<Student> getObj(@RequestBody Student student){
        Student result = studentService.getObj(student.getSid());
        if(result != null) {
            result.setCode(200);
        }
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping("/refreshToken")
    public ResponseEntity<Token> refreshToken(@RequestBody Student student){
        String token = studentService.refreshToken(student);
        return new ResponseEntity<>(new Token(token), HttpStatus.OK);
    }

    @RequestMapping("/initMsg")
    public ResponseEntity<List<Message>> initMsg(){
        List<Message> messages = userService.initMsg();
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}
