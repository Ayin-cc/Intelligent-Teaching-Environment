package service;

import entity.Classroom;
import entity.Teacher;

public interface ClassroomService {
    boolean login(Teacher teacher);
    int register(Teacher teacher);
    String refreshToken(Classroom classroom);
}
