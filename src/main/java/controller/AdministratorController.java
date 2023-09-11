package controller;

import entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.AdministratorService;

import java.util.List;

@RestController
@CrossOrigin(value = "*", allowCredentials = "true")
@RequestMapping("/Administrator")
public class AdministratorController {
    @Autowired
    private AdministratorService administratorService;

    @RequestMapping("/login")
    public ResponseEntity<StatusCode> login(@RequestBody Administrator administrator){
        if(administratorService.login(administrator)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/register")
    public ResponseEntity<StatusCode> register(@RequestBody Administrator administrator){
        int code = administratorService.register(administrator);
        return new ResponseEntity<>(new StatusCode(code), HttpStatus.OK);
    }

    @RequestMapping("/refreshToken")
    public ResponseEntity<Token> refreshToken(@RequestBody Administrator administrator){
        String token = administratorService.refreshToken(administrator);
        return new ResponseEntity<>(new Token(token), HttpStatus.OK);
    }

    @RequestMapping("/addStudent")
    public ResponseEntity<StatusCode> addStudent(@RequestHeader("Authorization") String token, @RequestBody Student student){
        if(administratorService.addStudent(token, student)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/changeStudent")
    public ResponseEntity<StatusCode> changeStudent(@CookieValue("token") String token, @RequestBody Student student){
        if(administratorService.changeStudent(token, student)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/queryStudent")
    public ResponseEntity<List<Student>> queryStudent(@CookieValue("token") String token, @RequestBody Student student){
        List<Student> result = administratorService.queryStudent(token, student.getSid(), student.getName(), student.getMajor(), student.getCollege(), student.getPhone());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping("/deleteStudent")
    public ResponseEntity<StatusCode> deleteStudent(@CookieValue("token") String token, @RequestBody Student student){
        if(administratorService.deleteStudent(token, student)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/addClassroom")
    public ResponseEntity<StatusCode> addClassroom(@CookieValue("token") String token, @RequestBody Classroom classroom){
        if(administratorService.addClassroom(token, classroom)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/changeClassroom")
    public ResponseEntity<StatusCode> changecClassroom(@RequestBody @CookieValue("token") String token, Classroom classroom){
        if(administratorService.changeClassroom(token, classroom)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/queryClassroom")
    public ResponseEntity<List<Classroom>> queryClassroom(@RequestBody @CookieValue("token") String token, Classroom classroom){
        List<Classroom> result = administratorService.queryClassroom(token, classroom.getCid(), classroom.getAddress());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping("/deleteClassroom")
    public ResponseEntity<StatusCode> deleteClassroom(@RequestBody @CookieValue("token") String token, Classroom classroom){
        if(administratorService.deleteClassroom(token, classroom)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/addCourse")
    public ResponseEntity<StatusCode> addCourse(@RequestBody @CookieValue("token") String token, Course course){
        if(administratorService.addCourse(token, course)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/changeCourse")
    public ResponseEntity<StatusCode> changeCourse(@RequestBody @CookieValue("token") String token, Course course){
        if(administratorService.changeCourse(token, course)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/queryCourse")
    public ResponseEntity<List<Course>> queryCourse(@RequestBody @CookieValue("token") String token, Course course){
        List<Course> result = administratorService.queryCourse(token, course.getCourseId(), course.getName(), course.getTeacher());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping("/deleteCourse")
    public ResponseEntity<StatusCode> deleteCourse(@RequestBody @CookieValue("token") String token, Course course){
        if(administratorService.deleteCourse(token, course)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/addStudentToCourse")
    public ResponseEntity<StatusCode> addStudentToCourse(@RequestBody @CookieValue("token") String token, Course course, Student student){
        if(administratorService.addStudentToCourse(token, course.getCourseId(), student.getSid())){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/deleteStudentFromCourse")
    public ResponseEntity<StatusCode> deleteStudentFromCourse(@RequestBody @CookieValue("token") String token, Course course, Student student){
        if(administratorService.deleteStudentFromCourse(token, student.getSid(), course.getCourseId())){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }
}
