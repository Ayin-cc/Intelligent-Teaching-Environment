package service;

import entity.Student;

import java.util.List;

public interface CallStuService {
    List<Student> random(String token, int count, String uid);
    boolean select(String token, String id, String sid);
}
