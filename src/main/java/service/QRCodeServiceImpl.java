package service;

import dao.QRCodeDao;
import entity.Course;
import entity.QRCodeResult;
import entity.QRcode;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.ConvertTime;
import util.QRCodeGenerator;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class QRCodeServiceImpl implements QRCodeService {
    @Autowired
    private QRCodeDao qrCodeDao;

    @Override
    public QRcode get(String token, String cid, String endTime) {
        if(qrCodeDao.checkClassroomToken(token) == 0){
            return null;
        }

        if (cid != null) {
            // 判断教室cid是否存在
            if (qrCodeDao.checkCid(cid) == 1) {
                String uniqueIdString;
                while(true) {
                    // 生成唯一标识符
                    UUID uniqueId = UUID.randomUUID();
                    uniqueIdString = uniqueId.toString();
                    if(qrCodeDao.checkUid(uniqueIdString) == 0){
                        break;
                    }
                }
                // 获取当前时间
                Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String time = formatter.format(date);
                // 获取课程号及学生
                String courseId = qrCodeDao.selectCourseByDate(cid, time.substring(0, 10), ConvertTime.timeToSection(time.substring(11))).getCourseId();
                List<String> students = qrCodeDao.selectStudentByCourseId(courseId);
                // 生成二维码
                String code = QRCodeGenerator.generate(uniqueIdString, cid, courseId);
                // 将生成的二维码存入数据库
                QRcode qRcode = new QRcode(code, cid, uniqueIdString, time, students);
                qrCodeDao.createQRCode(qRcode);
                // 将对应学生签到状态设为0
                Course courses = qrCodeDao.selectCourseByCourseId(courseId);
                for (int i = 0; i < courses.getStudents().size(); i++) {
                    qrCodeDao.setStudentStatus(courses.getStudents().get(i).getSid(), 0);
                }

                return qRcode;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    }

    @Override
    public boolean checkStudent(String sid) {
        if(qrCodeDao.checkStudentStatus(sid) == 1){
            return true;
        }
        return false;
    }

    @Override
    public boolean scan(String token, String courseId, String uid){
        // 判断学生token和对应二维码是否存在
        if(qrCodeDao.checkScan(token, uid) == 1){
            // 判断二维码是否过期
            Date date = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
            String now = formatter.format(date);
            if(qrCodeDao.checkQRCodeTime(now, uid) == 0){
                return false;
            }
            // 判断学生是否为该节课的学生
            if(qrCodeDao.checkStudentInCourse(token, courseId) == 0){
                return false;
            }
            // 存入数据库
            String sid = qrCodeDao.selectStudentByToken(token).getSid();
            qrCodeDao.updateQRCode(uid, sid);
            qrCodeDao.setStudentStatus(sid, 1);

            return true;
        }
        else{
            return false;
        }
    }

    @Override
    public List<Student> update(String token, String uid){
        if(qrCodeDao.checkClassroomToken(token) == 0){
            return null;
        }
        return qrCodeDao.selectStudentByUid(uid);
    }

    @Override
    public List<QRCodeResult> query(String token, String cid, String date, String courseName, String courseId, String teacher){
        if(qrCodeDao.checkAdministratorToken(token) == 0){
            System.out.println(token);
            return null;
        }
        System.out.println(cid);
        System.out.println(cid != null);
        List<QRCodeResult> result = qrCodeDao.selectQRCodeByMulti(cid, date, courseName, courseId, teacher);
        System.out.println(result.toString());
        return result;
    }
}
