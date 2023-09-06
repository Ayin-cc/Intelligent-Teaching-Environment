package controller;

import dao.UserDao;
import entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.ClassroomService;
import service.UserService;

import java.util.List;

@RestController
@CrossOrigin(value = "*", allowCredentials = "true")
@RequestMapping("/Classroom")
public class ClassroomController {
    @Autowired
    private ClassroomService classroomService;
    @Autowired
    private UserService userService;

    @RequestMapping("/login")
    public ResponseEntity<StatusCode> login(@RequestBody Teacher teacher){
        if(classroomService.login(teacher)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/register")
    public ResponseEntity<StatusCode> register(@RequestBody Teacher teacher){
        int code = classroomService.register(teacher);
        return new ResponseEntity<>(new StatusCode(code), HttpStatus.OK);
    }

    @RequestMapping("/refreshToken")
    public ResponseEntity<Token> refreshToken(@RequestBody Classroom classroom){
        String token = classroomService.refreshToken(classroom);
        return new ResponseEntity<>(new Token(token), HttpStatus.OK);
    }

    @RequestMapping("/initMsg")
    public ResponseEntity<List<Message>> initMsg(){
        List<Message> messages = userService.initMsg();
        if(messages.isEmpty()){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @RequestMapping("/initCourseSchedule")
    public ResponseEntity<List<Course>> initCourseSchedule(@RequestBody Classroom classroom){
        List<Course> courses = userService.initCourseSchedule(classroom);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }
}
