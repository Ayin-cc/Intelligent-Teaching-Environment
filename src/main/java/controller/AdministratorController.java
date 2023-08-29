package controller;

import entity.Classroom;
import entity.Course;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.AdministratorService;

import java.util.List;

@RestController
@RequestMapping("/administrator")
public class AdministratorController {
    @Autowired
    private AdministratorService administratorService;

    @RequestMapping("/addStudent")
    public ResponseEntity<String> addStudent(@RequestBody String token, Student student){
        if(administratorService.addStudent(token, student)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/changeStudent")
    public ResponseEntity<String> changeStudent(@RequestBody String token, Student student){
        if(administratorService.changeStudent(token, student)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/queryStudent")
    public ResponseEntity<List<Student>> queryStudent(@RequestBody String token, String sid, String name, String major, String college, String phone){
        List<Student> result = administratorService.queryStudent(token, sid, name, major, college, phone);
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/deleteStudent")
    public ResponseEntity<String> deleteStudent(@RequestBody String token, Student student){
        if(administratorService.deleteStudent(token, student)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/addClassroom")
    public ResponseEntity<String> addClassroom(@RequestBody String token, Classroom classroom){
        if(administratorService.addClassroom(token, classroom)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/changeClassroom")
    public ResponseEntity<String> changecClassroom(@RequestBody String token, Classroom classroom){
        if(administratorService.changeClassroom(token, classroom)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/queryClassroom")
    public ResponseEntity<List<Classroom>> queryClassroom(@RequestBody String token, String cid, String address){
        List<Classroom> result = administratorService.queryClassroom(token, cid, address);
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/deleteClassroom")
    public ResponseEntity<String> deleteClassroom(@RequestBody String token, Classroom classroom){
        if(administratorService.deleteClassroom(token, classroom)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/addCourse")
    public ResponseEntity<String> addCourse(@RequestBody String token, Course course){
        if(administratorService.addCourse(token, course)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/changeCourse")
    public ResponseEntity<String> changeCourse(@RequestBody String token, Course course){
        if(administratorService.changeCourse(token, course)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/queryCourse")
    public ResponseEntity<List<Course>> queryCourse(@RequestBody String token, String id, String name, String teacher){
        List<Course> result = administratorService.queryCourse(token, id, name, teacher);
        if(result != null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/deleteCourse")
    public ResponseEntity<String> deleteCourse(@RequestBody String token, Course course){
        if(administratorService.deleteCourse(token, course)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/addStudentToCourse")
    public ResponseEntity<String> addStudentToCourse(@RequestBody String token, String id, String sid){
        if(administratorService.addStudentToCourse(token, id, sid)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @RequestMapping("/deleteStudentFromCourse")
    public ResponseEntity<String> deleteStudentFromCourse(@RequestBody String token, Student student, Course course){
        if(administratorService.deleteStudentFromCourse(token, student, course)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
