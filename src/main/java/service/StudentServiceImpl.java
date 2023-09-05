package service;

import dao.UserDao;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.GenerateToken;

@Service
public class StudentServiceImpl implements StudentService {
    @Autowired
    UserDao userDao;

    @Override
    public boolean login(Student student) {
        if(userDao.checkStudent(student) == 1){
            return true;
        }
        return false;
    }

    @Override
    public int register(Student student) {
        if(userDao.queryStudent(student.getSid()) == 1){
            return 401;
        }
        userDao.updateStudent(student);
        return 200;
    }

    @Override
    public String refreshToken(Student student) {
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
}
