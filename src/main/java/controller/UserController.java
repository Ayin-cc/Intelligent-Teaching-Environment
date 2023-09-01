package controller;

import entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import service.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/loginStudent")
    public ResponseEntity<StatusCode> loginStudent(@RequestBody Student student){
        if(userService.loginStudent(student)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/loginTeacher")
    public ResponseEntity<StatusCode> loginTeacher(@RequestBody Teacher teacher){
        if(userService.loginTeacher(teacher)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/loginAdministrator")
    public ResponseEntity<StatusCode> loginAdministrator(@RequestBody Administrator administrator){
        if(userService.loginAdministrator(administrator)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/registerStudent")
    public ResponseEntity<StatusCode> registerStudent(@RequestBody Student student){
        if(userService.registerStudent(student)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/registerTeacher")
    public ResponseEntity<StatusCode> registerTeacher(@RequestBody Teacher teacher){
        if(userService.registerTeacher(teacher)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/registerAdministrator")
    public ResponseEntity<StatusCode> registerAdministrator(@RequestBody Administrator administrator){
        if (userService.registerAdministrator(administrator)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/refreshStudentToken")
    public ResponseEntity<Token> refreshStudentToken(@RequestBody Student student){
        String token = userService.refreshStudentToken(student);
        return new ResponseEntity<>(new Token(token), HttpStatus.OK);
    }

    @RequestMapping("/refreshClassroomToken")
    public ResponseEntity<Token> refreshClassroomToken(@RequestBody Classroom classroom){
        String token = userService.refreshClassroomToken(classroom);
        return new ResponseEntity<>(new Token(token), HttpStatus.OK);
    }


    @RequestMapping("/refreshAdministratorToken")
    public ResponseEntity<Token> refreshAdministratorToken(@RequestBody Administrator administrator){
        String token = userService.refreshAdministratorToken(administrator);
        return new ResponseEntity<>(new Token(token), HttpStatus.OK);
    }

    @RequestMapping("/initMsg")
    public ResponseEntity<List<Message>> initMsg(){
        List<Message> messages = userService.initMsg();
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }

    @RequestMapping("/initCourseSchedule")
    public ResponseEntity<List<Course>> initCourseSchedule(@RequestBody Classroom classroom){
        List<Course> courses = userService.initCourseSchedule(classroom);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }
}
