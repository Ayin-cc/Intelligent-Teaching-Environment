package dao;

import entity.QRcode;
import entity.Student;
import org.springframework.stereotype.Repository;

@Repository
public interface QRCodeDao {
    int createQRCode(QRcode qRcode);
    int updateQRCode(String uid, String sid);
    QRcode selectQRCodeByCid(String cid);
    QRcode selectQRCodeByUid(String uid);
    Student selectStudentByToken(String token);
    int checkCid(String cid);
    int checkScan(String token, String uid);
}
