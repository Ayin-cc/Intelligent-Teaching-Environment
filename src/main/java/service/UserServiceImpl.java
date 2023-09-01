package service;

import dao.UserDao;
import entity.*;
import org.apache.tools.ant.taskdefs.Local;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.GenerateToken;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

    @Override
    public boolean loginStudent(Student student) {
        if(userDao.checkStudent(student) == 1){
            return true;
        }
        return false;
    }

    @Override
    public boolean loginTeacher(Teacher teacher) {
        if(userDao.checkTeacher(teacher) == 1){
            return true;
        }
        return false;
    }

    @Override
    public boolean loginAdministrator(Administrator administrator) {
        if(userDao.checkAdministrator(administrator) == 1){
            return true;
        }
        return false;
    }

    @Override
    public boolean registerStudent(Student student) {
        if(userDao.queryStudent(student.getSid()) == 1){
            userDao.updateStudent(student);
            return true;
        }
        return false;
    }

    @Override
    public boolean registerTeacher(Teacher teacher) {
        if(userDao.queryTeacher(teacher.getId()) == 1){
            userDao.updateTeacher(teacher);
            return true;
        }
        return false;
    }

    @Override
    public boolean registerAdministrator(Administrator administrator) {
        userDao.addAdministrator(administrator);
        return true;
    }

    @Override
    public String refreshStudentToken(Student student) {
        String token = GenerateToken.generateToken();
        while (true){
            if(userDao.checkToken(token) == 0){
                break;
            }
            token = GenerateToken.generateToken();
        }
        userDao.updateStudentToken(student.getSid(), token);
        return token;
    }

    @Override
    public String refreshClassroomToken(Classroom classroom) {
        String token = GenerateToken.generateToken();
        while (true){
            if(userDao.checkToken(token) == 0){
                break;
            }
            token = GenerateToken.generateToken();
        }
        userDao.updateClassroomToken(classroom.getCid(), token);
        return token;
    }

    @Override
    public String refreshAdministratorToken(Administrator administrator) {
        String token = GenerateToken.generateToken();
        while (true){
            if(userDao.checkToken(token) == 0){
                break;
            }
            token = GenerateToken.generateToken();
        }
        userDao.updateAdministratorToken(administrator.getId(), token);
        return token;
    }

    @Override
    public List<Message> initMsg() {
        return userDao.selectMsg();
    }

    @Override
    public List<Course> initCourseSchedule(Classroom classroom) {
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return userDao.selectCourse(classroom, date.format(formatter));
    }
}
