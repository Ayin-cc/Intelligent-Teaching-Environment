package util;

import config.SpringConfig;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import sql.QRCodeDao;

public class CheckUid {
    public static boolean checkClassroom(int uid){
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
        QRCodeDao qrCodeDao = ctx.getBean(QRCodeDao.class);
        boolean flag = qrCodeDao.exist(uid);

        return flag;
    }
}
