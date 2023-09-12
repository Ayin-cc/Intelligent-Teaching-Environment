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
    public ResponseEntity<QRcode> get(@RequestHeader("Authorization") String token, @RequestBody Classroom classroom, @RequestParam("endTime") String endTime) {
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
    public ResponseEntity<String> scan(@RequestHeader("Authorization")String token, @RequestBody QRcode qRcode){
        if(qrCodeService.scan(token, qRcode.getCourseId(), qRcode.getUid())){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 教室端更新签到数据接口
    @RequestMapping("/update")
    public ResponseEntity<List<Student>> update(@RequestHeader("Authorization") String token, @RequestBody QRcode qRcode){
        List<Student> students = qrCodeService.update(token, qRcode.getUid());
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // 查询签到数据接口
    @RequestMapping("/query")
    public ResponseEntity<List<QRCodeResult>> query(@RequestHeader("Authorization") String token, @RequestParam("courseName") String courseName, @RequestParam("cid") String cid, @RequestParam("date") String date, @RequestParam("courseId") String courseId, @RequestParam("teacher") String teacher){
        List<QRCodeResult> result = qrCodeService.query(token, cid, date, courseName, courseId, teacher);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
