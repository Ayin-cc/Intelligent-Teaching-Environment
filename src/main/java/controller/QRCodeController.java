package controller;

import entity.QRcode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import serve.QRCodeService;

@RestController
@RequestMapping("/QRCode")
public class QRCodeController {
    @Autowired
    private QRCodeService qrCodeService;

    // 教师端获取二维码接口
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

    // 学生端扫描二维码接口
    @RequestMapping("/scan")
    public void scan(@RequestBody String type, String sid){

    }

    // 查询签到数据接口
    @RequestMapping("/query")
    public void query(@RequestBody String type, String cid){

    }
}
