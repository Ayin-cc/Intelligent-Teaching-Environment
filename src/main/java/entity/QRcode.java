package entity;


import org.springframework.stereotype.Component;

@Component
public class QRcode {
    private String type = "qrcode";
    private String cid;
    private String code;

    public QRcode() {
    }

    public QRcode(String cid, String code) {
        this.cid = cid;
        this.code = code;
    }

    public String getId() {
        return cid;
    }

    public void setId(String cid) {
        this.cid = cid;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

}
