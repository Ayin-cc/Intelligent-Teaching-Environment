package controller;

import entity.QRCodeResult;
import entity.QRcode;
import entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.QRCodeService;

import java.util.List;

@RestController
@RequestMapping("/QRCode")
public class QRCodeController {
    @Autowired
    private QRCodeService qrCodeService;

    // 教师端获取二维码接口
    @RequestMapping("/get")
    public ResponseEntity<QRcode> get(@RequestBody String token, String cid) {
        QRcode qRcode = qrCodeService.get(token, cid);
        if(qRcode == null){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        else {
            return new ResponseEntity<>(qRcode, HttpStatus.OK);
        }
    }

    // 学生端扫描二维码接口
    @RequestMapping("/scan")
    public ResponseEntity<String> scan(@RequestBody String token, String courseId, String uid){
        if(qrCodeService.scan(token, courseId, uid)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 教室端更新签到数据接口
    @RequestMapping("/update")
    public ResponseEntity<List<Student>> update(@RequestBody String token, String uid){
        List<Student> students = qrCodeService.update(token, uid);
        return new ResponseEntity<>(students, HttpStatus.OK);
    }

    // 查询签到数据接口
    @RequestMapping("/query")
    public ResponseEntity<List<QRCodeResult>> query(@RequestBody String token, String uid, String courseName, String cid, String date, String courseId, String teacher){
        List<QRCodeResult> result = qrCodeService.query(token, cid, date, courseName, courseId, teacher);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
