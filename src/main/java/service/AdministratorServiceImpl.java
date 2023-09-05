package service;

import dao.AdministratorDao;
import dao.UserDao;
import entity.Administrator;
import entity.Classroom;
import entity.Course;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.GenerateToken;

import java.sql.SQLException;
import java.util.List;

@Service
public class AdministratorServiceImpl implements AdministratorService{
    @Autowired
    private AdministratorDao administratorDao;
    private UserDao userDao;

    @Override
    public boolean login(Administrator administrator) {
        if(userDao.checkAdministrator(administrator) == 1){
            return true;
        }
        return false;
    }

    @Override
    public int register(Administrator administrator) {
        userDao.addAdministrator(administrator);
        return 200;
    }

    @Override
    public String refreshToken(Administrator administrator) {
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
    public boolean addStudent(String token, Student student) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.addStudent(student);
            return true;
        }
        return false;
    }

    @Override
    public boolean changeStudent(String token, Student student) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.changeStudent(student);
            return true;
        }
        return false;
    }

    @Override
    public List<Student> queryStudent(String token, String sid, String name, String major, String college, String phone) {
        if(administratorDao.checkToken(token) == 0){
            return null;
        }
        List<Student> students = administratorDao.queryStudent(sid, name, major, college, phone);
        return students;
    }


    @Override
    public boolean deleteStudent(String token, Student student) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.deleteStudent(student);
            return true;
        }
        return false;
    }

    @Override
    public boolean addClassroom(String token, Classroom classroom) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.addClassroom(classroom);
            return true;
        }
        return false;
    }

    @Override
    public boolean changeClassroom(String token, Classroom classroom) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.changeClassroom(classroom);
            return true;
        }
        return false;
    }

    @Override
    public List<Classroom> queryClassroom(String token, String cid, String address) {
        if(administratorDao.checkToken(token) == 0){
            return null;
        }
        List<Classroom> classrooms = administratorDao.queryClassroom(cid, address);
        return classrooms;
    }


    @Override
    public boolean deleteClassroom(String token, Classroom classroom) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.deleteClassroom(classroom);
            return true;
        }
        return false;
    }

    @Override
    public boolean addCourse(String token, Course course) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.addCourseInf(course);
            String cid = administratorDao.selectCidBySite(course.getSite());
            for(int i = 0; i <= course.getDate().size(); i++){
                for(int j = course.getStartSection(); j <= course.getEndSection(); j++){
                    administratorDao.addCourseSchedule(cid, j, course.getCourseId(), course.getDate().get(i));
                }
            }
            return true;
        }
        return false;
    }

    @Override
    public boolean changeCourse(String token, Course course) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.changeCourseInf(course);
            String cid = administratorDao.selectCidBySite(course.getSite());
            for(int i = 0; i < course.getDate().size(); i++){
                for(int j = course.getStartSection(); j <= course.getEndSection(); j++){
                    administratorDao.changeCourseSchedule(cid, j, course.getCourseId(), course.getDate().get(i));
                }
            }
            return true;
        }
        return false;
    }

    @Override
    public List<Course> queryCourse(String token, String id, String name, String teacher) {
        if(administratorDao.checkToken(token) == 0){
            return null;
        }
        List<Course> courses = administratorDao.queryCourse(id, name, teacher);
        return courses;
    }


    @Override
    public boolean deleteCourse(String token, Course course) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.deleteCourseInf(course);
            administratorDao.deleteCourseSchedule(course.getCourseId());
            return true;
        }
        return false;
    }

    @Override
    public boolean addStudentToCourse(String token, String id, String sid) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.addStudentToCourse(id, sid);
            return true;
        }
        return false;
    }

    @Override
    public boolean deleteStudentFromCourse(String token, String sid, String id) {
        if(administratorDao.checkToken(token) == 1){
            administratorDao.deleteStudentFromCourse(id, sid);
            return true;
        }
        return false;
    }
}
