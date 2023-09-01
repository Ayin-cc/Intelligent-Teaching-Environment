package service;

import entity.Course;
import entity.Student;

import java.util.List;

public interface CourseSchedualeService {
    List<Course> get(Student student);
}
