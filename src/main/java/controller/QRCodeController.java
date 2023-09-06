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
    public ResponseEntity<QRcode> get(@RequestBody @CookieValue("token") String token, Classroom classroom) {
        QRcode qRcode = qrCodeService.get(token, classroom.getCid());
        if(qRcode == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else {
            return new ResponseEntity<>(qRcode, HttpStatus.OK);
        }
    }

    // 学生端扫描二维码接口
    @RequestMapping("/scan")
    public ResponseEntity<String> scan(@RequestBody @CookieValue("token") String token, String courseId, String uid){
        if(qrCodeService.scan(token, courseId, uid)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 教室端更新签到数据接口
    @RequestMapping("/update")
    public ResponseEntity<List<Student>> update(@RequestBody @CookieValue("token") String token, QRcode qRcode){
        List<Student> students = qrCodeService.update(token, qRcode.getUid());
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // 查询签到数据接口
    @RequestMapping("/query")
    public ResponseEntity<List<QRCodeResult>> query(@RequestBody @CookieValue("token") String token, String courseName, String cid, String date, String courseId, String teacher){
        List<QRCodeResult> result = qrCodeService.query(token, cid, date, courseName, courseId, teacher);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
