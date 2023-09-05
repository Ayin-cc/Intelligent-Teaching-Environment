package service;

import entity.*;

import java.util.List;

public interface UserService {
    List<Message> initMsg();
    List<Course> initCourseSchedule(Classroom classroom);
}
