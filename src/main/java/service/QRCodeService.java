package service;


import entity.QRCodeResult;
import entity.QRcode;
import entity.Student;

import java.util.List;

public interface QRCodeService {
    QRcode get(String cid);
    boolean scan(String token, String courseId, String uid);
    List<Student> update(String uid);
    List<QRCodeResult> query(String uid, String cid, String date, String courseName, String courseId, String teacherId);

}
