package serve;


import entity.QRcode;

public interface QRCodeService {
    QRcode get(String cid);
    void scan(String code);

}
