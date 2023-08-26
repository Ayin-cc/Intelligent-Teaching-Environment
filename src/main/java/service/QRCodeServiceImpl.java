package service;

import dao.QRCodeDao;
import entity.QRcode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import util.QRCodeGenerator;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

@Service
public class QRCodeServiceImpl implements QRCodeService {
    @Autowired
    private QRCodeDao qrCodeDao;

    @Override
    public QRcode get(String cid) {
        if (cid != null) {
            // 判断教室cid是否存在
            if (qrCodeDao.checkCid(cid) == 1) {
                String uniqueIdString;
                {
                    // 生成唯一标识符
                    UUID uniqueId = UUID.randomUUID();
                    uniqueIdString = uniqueId.toString();
                }

                // 生成二维码
                String code = QRCodeGenerator.generate(uniqueIdString, cid);

                // 获取当前时间
                Date date = new Date();
                SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm");
                String time = formatter.format(date);

                // 将生成的二维码存入数据库
                QRcode qRcode = new QRcode(code, cid, uniqueIdString, time);
                qrCodeDao.createQRCode(qRcode);

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
    public boolean scan(String token, String uid){
        // 判断学生token和对应二维码是否存在
        if(qrCodeDao.checkScan(token, uid) == 1){
            // 存入数据库
            qrCodeDao.updateQRCode(uid, qrCodeDao.selectStudentByToken(token).getId());

            return true;
        }
        else{
            return false;
        }
    }
}
