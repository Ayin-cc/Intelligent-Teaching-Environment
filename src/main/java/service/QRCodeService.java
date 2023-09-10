package service;


import entity.QRCodeResult;
import entity.QRcode;
import entity.Student;

import java.util.List;

public interface QRCodeService {
    QRcode get(String token, String cid, String endTime);
    boolean checkStudent(String sid);
    boolean scan(String token, String courseId, String uid);
    List<Student> update(String token, String uid);
    List<QRCodeResult> query(String token, String cid, String date, String courseName, String courseId, String teacherId);

}
