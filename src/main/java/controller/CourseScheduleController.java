package controller;


import entity.Course;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.CourseSchedualeService;

import java.util.List;

@RestController
@RequestMapping("/CourseSchedule")
public class CourseScheduleController {
    @Autowired
    private CourseSchedualeService courseSchedualeService;

    // 获取课表接口
    @RequestMapping("/get")
    public ResponseEntity<List<Course>> get(@RequestBody Student student){
        List<Course> courses = courseSchedualeService.get(student);
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

}
