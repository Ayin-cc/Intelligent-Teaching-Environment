package controller;

import entity.Classroom;
import entity.QRCodeResult;
import entity.QRcode;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.QRCodeService;

import java.util.List;

@RestController
@CrossOrigin(value = "*", allowCredentials = "true")
@RequestMapping("/QRCode")
public class QRCodeController {
    @Autowired
    private QRCodeService qrCodeService;

    // 教室端获取二维码接口
    @RequestMapping("/get")
    public ResponseEntity<QRcode> get(@CookieValue("token") String token, @RequestBody Classroom classroom, @RequestParam("endTime") String endTime) {
        QRcode qRcode = qrCodeService.get(token, classroom.getCid(), endTime);
        if(qRcode == null){
            return new ResponseEntity<>(null, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(qRcode, HttpStatus.OK);
        }
    }

    // 检查学生签到状态
    @RequestMapping("/checkStudent")
    public ResponseEntity<Student> checkStudent(@RequestBody Student student){
        if(qrCodeService.checkStudent(student.getSid())){
            student.setCode(1);
            return new ResponseEntity<>(student, HttpStatus.OK);
        }
        student.setCode(0);
        return new ResponseEntity<>(student, HttpStatus.OK);
    }

    // 学生端扫描二维码接口
    @RequestMapping("/scan")
    public ResponseEntity<String> scan(@CookieValue("token")String token, @RequestParam("courseId") String courseId, @RequestParam("uid") String uid){
        if(qrCodeService.scan(token, courseId, uid)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 教室端更新签到数据接口
    @RequestMapping("/update")
    public ResponseEntity<List<Student>> update(@CookieValue("token") String token, @RequestBody QRcode qRcode){
        List<Student> students = qrCodeService.update(token, qRcode.getUid());
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // 查询签到数据接口
    @RequestMapping("/query")
    public ResponseEntity<List<QRCodeResult>> query(@CookieValue("token") String token, @RequestBody String courseName, @RequestBody String cid, @RequestBody String date, @RequestBody String courseId, @RequestBody String teacher){
        List<QRCodeResult> result = qrCodeService.query(token, cid, date, courseName, courseId, teacher);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
