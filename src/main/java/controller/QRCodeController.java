package controller;

import entity.QRcode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import service.QRCodeService;

@RestController
@RequestMapping("/QRCode")
public class QRCodeController {
    @Autowired
    private QRCodeService qrCodeService;

    // 教师端获取二维码接口
    @RequestMapping("/get")
    public ResponseEntity<QRcode> get(@RequestBody String type, String cid) {
        if(type.equals("qrcode")){
            QRcode qRcode = qrCodeService.get(cid);
            if(qRcode == null){
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            else {
                return new ResponseEntity<>(qRcode, HttpStatus.OK);
            }
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 学生端扫描二维码接口
    @RequestMapping("/scan")
    public ResponseEntity<String> scan(@RequestBody String token, String uid){
        if(qrCodeService.scan(token, uid)){
            return new ResponseEntity<>("OK", HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // 查询签到数据接口
    @RequestMapping("/query")
    public void query(@RequestBody String type, String cid){
        if(type.equals("qrcode")){

        }
        else{

        }
    }
}
