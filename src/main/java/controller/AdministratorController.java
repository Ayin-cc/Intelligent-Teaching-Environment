package controller;

import entity.Classroom;
import entity.Course;
import entity.StatusCode;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import service.AdministratorService;

import java.util.List;

@RestController
@RequestMapping("/administrator")
public class AdministratorController {
    @Autowired
    private AdministratorService administratorService;

    @RequestMapping("/addStudent")
    public ResponseEntity<StatusCode> addStudent(@RequestBody @RequestParam("token") String token, Student student){
        if(administratorService.addStudent(token, student)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/changeStudent")
    public ResponseEntity<StatusCode> changeStudent(@RequestBody @RequestParam("token") String token, Student student){
        if(administratorService.changeStudent(token, student)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/queryStudent")
    public ResponseEntity<List<Student>> queryStudent(@RequestBody @RequestParam("token") String token, String sid, String name, String major, String college, String phone){
        List<Student> result = administratorService.queryStudent(token, sid, name, major, college, phone);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping("/deleteStudent")
    public ResponseEntity<StatusCode> deleteStudent(@RequestBody @RequestParam("token") String token, Student student){
        if(administratorService.deleteStudent(token, student)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/addClassroom")
    public ResponseEntity<StatusCode> addClassroom(@RequestBody @RequestParam("token") String token, Classroom classroom){
        if(administratorService.addClassroom(token, classroom)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/changeClassroom")
    public ResponseEntity<StatusCode> changecClassroom(@RequestBody @RequestParam("token") String token, Classroom classroom){
        if(administratorService.changeClassroom(token, classroom)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/queryClassroom")
    public ResponseEntity<List<Classroom>> queryClassroom(@RequestBody @RequestParam("token") String token, String cid, String address){
        List<Classroom> result = administratorService.queryClassroom(token, cid, address);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping("/deleteClassroom")
    public ResponseEntity<StatusCode> deleteClassroom(@RequestBody @RequestParam("token") String token, Classroom classroom){
        if(administratorService.deleteClassroom(token, classroom)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/addCourse")
    public ResponseEntity<StatusCode> addCourse(@RequestBody @RequestParam("token") String token, Course course){
        if(administratorService.addCourse(token, course)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/changeCourse")
    public ResponseEntity<StatusCode> changeCourse(@RequestBody @RequestParam("token") String token, Course course){
        if(administratorService.changeCourse(token, course)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/queryCourse")
    public ResponseEntity<List<Course>> queryCourse(@RequestBody @RequestParam("token") String token, String id, String name, String teacher){
        List<Course> result = administratorService.queryCourse(token, id, name, teacher);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping("/deleteCourse")
    public ResponseEntity<StatusCode> deleteCourse(@RequestBody @RequestParam("token") String token, Course course){
        if(administratorService.deleteCourse(token, course)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/addStudentToCourse")
    public ResponseEntity<StatusCode> addStudentToCourse(@RequestBody @RequestParam("token") String token, String id, String sid){
        if(administratorService.addStudentToCourse(token, id, sid)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }

    @RequestMapping("/deleteStudentFromCourse")
    public ResponseEntity<StatusCode> deleteStudentFromCourse(@RequestBody @RequestParam("token") String token, Student student, Course course){
        if(administratorService.deleteStudentFromCourse(token, student, course)){
            return new ResponseEntity<>(new StatusCode(1), HttpStatus.OK);
        }
        return new ResponseEntity<>(new StatusCode(0), HttpStatus.OK);
    }
}
