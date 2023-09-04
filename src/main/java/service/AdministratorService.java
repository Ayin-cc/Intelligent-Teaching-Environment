package service;

import entity.Classroom;
import entity.Course;
import entity.Student;

import java.util.List;

public interface AdministratorService {
    boolean addStudent(String token, Student student);
    boolean changeStudent(String token, Student student);
    List<Student> queryStudent(String token, String sid, String name, String major, String college, String phone);
    boolean deleteStudent(String token, Student student);
    boolean addClassroom(String token, Classroom classroom);
    boolean changeClassroom(String token, Classroom classroom);
    List<Classroom> queryClassroom(String token, String cid, String address);
    boolean deleteClassroom(String token, Classroom classroom);
    boolean addCourse(String token, Course course);
    boolean changeCourse(String token, Course course);
    List<Course> queryCourse(String token, String id, String name, String teacher);
    boolean deleteCourse(String token, Course course);
    boolean addStudentToCourse(String token, String id, String sid);
    boolean deleteStudentFromCourse(String token, String sid, String id);
}
