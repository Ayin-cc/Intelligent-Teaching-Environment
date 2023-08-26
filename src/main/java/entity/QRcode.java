package entity;


import org.springframework.stereotype.Component;

import java.util.List;


@Component
public class QRcode {
    private String type = "qrcode";
    private String code;
    private String cid;
    private String uid;
    private String time;
    private int count;
    private List<String> sid;

    public QRcode() {
    }

    public QRcode(String cid, String code) {
        this.cid = cid;
        this.code = code;
    }

    public QRcode(String code, String cid, String uid, String time) {
        this.type = type;
        this.code = code;
        this.cid = cid;
        this.uid = uid;
        this.time = time;
        this.count = 0;
    }

    public String getId() {
        return cid;
    }

    public void setId(String cid) {
        this.cid = cid;
    }

    public String getUid() {
        return uid;
    }

    public void setUid(String uid) {
        this.uid = uid;
    }

    /**
     * 获取
     * @return type
     */
    public String getType() {
        return type;
    }

    /**
     * 设置
     * @param type
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * 获取
     * @return code
     */
    public String getCode() {
        return code;
    }

    /**
     * 设置
     * @param code
     */
    public void setCode(String code) {
        this.code = code;
    }

    /**
     * 获取
     * @return cid
     */
    public String getCid() {
        return cid;
    }

    /**
     * 设置
     * @param cid
     */
    public void setCid(String cid) {
        this.cid = cid;
    }

    /**
     * 获取
     * @return time
     */
    public String getTime() {
        return time;
    }

    /**
     * 设置
     * @param time
     */
    public void setTime(String time) {
        this.time = time;
    }

    /**
     * 获取
     * @return count
     */
    public int getCount() {
        return count;
    }

    /**
     * 设置
     * @param count
     */
    public void setCount(int count) {
        this.count = count;
    }

    /**
     * 获取
     * @return sid
     */
    public List<String> getSid() {
        return sid;
    }

    /**
     * 设置
     * @param sid
     */
    public void setSid(List<String> sid) {
        this.sid = sid;
    }

    public String toString() {
        return "QRcode{type = " + type + ", code = " + code + ", cid = " + cid + ", uid = " + uid + ", time = " + time + ", count = " + count + ", sid = " + sid + "}";
    }
}
