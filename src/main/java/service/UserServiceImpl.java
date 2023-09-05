package service;

import dao.UserDao;
import entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserDao userDao;

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
