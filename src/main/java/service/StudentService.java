package service;

import entity.Student;

public interface StudentService {
    boolean login(Student student);
    int register(Student student);
    String refreshToken(Student student);
    Student getObj(String sid);
}
