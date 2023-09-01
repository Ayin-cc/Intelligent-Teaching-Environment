package service;

import entity.*;

import java.util.List;

public interface UserService {
    boolean loginStudent(Student student);
    boolean loginTeacher(Teacher teacher);
    boolean loginAdministrator(Administrator administrator);
    boolean registerStudent(Student student);
    boolean registerTeacher(Teacher teacher);
    boolean registerAdministrator(Administrator administrator);
    String refreshStudentToken(Student student);
    String refreshClassroomToken(Classroom classroom);
    String refreshAdministratorToken(Administrator administrator);
    List<Message> initMsg();
    List<Course> initCourseSchedule(Classroom classroom);
}
