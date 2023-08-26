package entity;

import org.springframework.stereotype.Component;

@Component
public class Classroom {
    private String id;
    private String address;
    private String passwd;
    private String schedule;
    private QRcode qrCode;

    public Classroom() {
    }

    public Classroom(String id, String address, String passwd, String schedule, QRcode qrCode) {
        this.id = id;
        this.address = address;
        this.passwd = passwd;
        this.schedule = schedule;
        this.qrCode = qrCode;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getSchedule() {
        return schedule;
    }

    public void setSchedule(String schedule) {
        this.schedule = schedule;
    }

    public QRcode getQRCode() {
        return qrCode;
    }

    public void setQRCode(QRcode qrCode) {
        this.qrCode = qrCode;
    }

}
