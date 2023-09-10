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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class AdministratorServiceImpl implements AdministratorService{
    @Autowired
    private AdministratorDao administratorDao;
    private UserDao userDao;

    @Override
    public String testsql() {
        String dates[][] = {{"2023-09-01", "2023-09-08", "2023-09-15", "2023-09-22"},
                {"2023-09-02", "2023-09-09", "2023-09-17", "2023-09-24"},
                {"2023-09-05", "2023-09-12", "2023-09-19", "2023-09-26"},
                {"2023-09-06", "2023-09-13", "2023-09-20", "2023-09-27"}};
        Student students[][] = new Student[4][5];
        for (int i = 1; i <= 20; i++) {
            Student student = new Student();
            student.setSid("学号" + i);
            student.setCollege("学院" + i);
            student.setName("学生" + i);
            student.setMajor("专业" + i);
            student.setPhone("手机号" + i);
            student.setSex("性别" + i);
            student.setPasswd("密码" + i);
            students[(i - 1) / 5][(i - 1) % 5] = student;
            addStudent("", student);
        }
        for (int i = 1; i <= 4; i++) {
            Classroom classroom = new Classroom();
            classroom.setCid("教室号" + i);
            classroom.setAddress("地点" + i);
            addClassroom("", classroom);
        }
        for (int i = 1; i <= 4; i++) {
            Course course = new Course();
            course.setCourseId("课程号" + i);
            course.setName("课程" + i);
            course.setDate(Arrays.asList(dates[i - 1]));
            course.setSite("地点" + i);
            course.setStudents(Arrays.asList(students[i - 1]));
            course.setTeacher("教师" + i);
            course.setStartSection(1);
            course.setEndSection(12);
            System.out.println(course.toString());
            addCourse("", course);
        }

        return "success";
    }

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
        //if(administratorDao.checkToken(token) == 1){
        // 检查学生是否已经存在
        if(administratorDao.checkStudent(student.getSid()) == 1){
            return false;
        }
            administratorDao.addStudent(student);
            return true;
        //}
        //return false;
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
//        if(administratorDao.checkToken(token) == 1){
        // 检查教室是否已经存在
        if(administratorDao.checkClassroom(classroom.getCid()) == 1){
            return false;
        }
            administratorDao.addClassroom(classroom);
            return true;
//        }
//        return false;
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
//        if(administratorDao.checkToken(token) == 1){
        //判断课程是否已经存在
        if(administratorDao.checkCourse(course.getCourseId()) == 1){
            return false;
        }
            administratorDao.addCourseInf(course);
            String cid = administratorDao.selectCidBySite(course.getSite());
            for(int i = 0; i < course.getDate().size(); i++){
                for(int j = course.getStartSection(); j <= course.getEndSection(); j++){
                    administratorDao.addCourseSchedule(cid, j, course.getCourseId(), course.getDate().get(i));
                }
            }
            return true;
//        }
//        return false;
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
