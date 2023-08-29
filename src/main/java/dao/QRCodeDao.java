package dao;

import entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QRCodeDao {
    void createQRCode(@Param("qrcode") QRcode qrcode);
    void updateQRCode(@Param("uid") String uid, @Param("sid") String sid);
    List<QRCodeResult> selectQRCodeByMulti(@Param("cid") String cid, @Param("date")  String date, @Param("teacher") String teacher, @Param("name") String name, @Param("id") String id);
    List<QRcode> selectQRCodeByCid(@Param("cid") String cid);
    List<String> selectStudentByCourseId(@Param("id") String id);
    Course selectCourseByDate(@Param("cid") String cid, @Param("date") String date, @Param("section") Integer section);
    List<QRcode> selectQRCodeByDate(@Param("date") String date);
    List<Course> selectCourseByTeacher(@Param("teacher") String teacher);
    List<Course> selectCourseByName(@Param("name") String name);
    List<Course> selectCourseByCourseId(@Param("id") String id);
    List<Student> selectStudentByUid(@Param("uid") String uid);
    QRcode selectQRCodeByUid(@Param("uid") String uid);
    Student selectStudentByToken(@Param("token") String token);
    int checkCid(@Param("cid") String cid);
    int checkUid(@Param("uid") String uid);
    int checkScan(@Param("token") String token, @Param("uid") String uid);
    int checkStudentInCourse(@Param("token") String token, @Param("courseId") String courseId);
    int checkClassroomToken(@Param("token")String token);
    int checkAdministratorToken(@Param("token")String token);
}
