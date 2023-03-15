package util;

import sql.QRCodeDao;

public class CheckUid {
    public static boolean checkClassroom(int uid){
        boolean flag = QRCodeDao.exist(uid);

        return flag;
    }
}
