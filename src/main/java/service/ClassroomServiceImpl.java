package service;

import dao.UserDao;
import entity.Classroom;
import entity.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.GenerateToken;

@Service
public class ClassroomServiceImpl implements ClassroomService {
    @Autowired
    UserDao userDao;

    @Override
    public boolean login(Teacher teacher) {
        if(userDao.checkTeacher(teacher) == 1){
            return true;
        }
        return false;
    }

    @Override
    public int register(Teacher teacher) {
        if(userDao.queryTeacher(teacher.getId()) == 1){
            return 401;
        }
        userDao.updateTeacher(teacher);
        return 200;
    }

    @Override
    public String refreshToken(Classroom classroom) {
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
}
