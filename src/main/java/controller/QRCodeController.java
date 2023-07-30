package controller;

import entity.QRcode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serve.QRCodeService;

@RestController
@RequestMapping("QRCode")
public class QRCodeController {
    @Autowired
    private QRCodeService qrCodeService;

    @RequestMapping("/get")
    public QRcode get(@RequestBody String type, String cid) {
        if(type.equals("qrcode")){
            return qrCodeService.get(cid);
        }
        else{
            System.out.println("请求信息错误!");
            return null;
        }
    }
}
