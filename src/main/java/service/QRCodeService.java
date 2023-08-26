package service;


import entity.QRcode;

public interface QRCodeService {
    QRcode get(String cid);
    boolean scan(String token, String uid);

}
