package serve;

import entity.QRcode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dao.QRCodeDao;
import util.CheckUid;
import util.QRCodeGenerator;

@Service
public class QRCodeServiceImpl implements QRCodeService {
    @Autowired
    private QRCodeDao qrCodeDao;

    @Override
    public QRcode get(String cid) {
        if (cid != null) {
            if (CheckUid.checkClassroom(Integer.parseInt(cid))) {
                // cid在数据库中存在
                // 发送响应数据-二维码的base64码
                return new QRcode(cid, QRCodeGenerator.generate(cid));
            } else {
                // cid不存在
                return null;
            }
        } else {
            return null;
        }
    }

    @Override
    public void scan(String code){
        // 根据code获取openid
    }
}
