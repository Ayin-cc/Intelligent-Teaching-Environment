package entity;

import org.springframework.stereotype.Component;

@Component
public class CallStudent {
    private String id;
    private String sid;
    private String callDate;
    private String callTime;


    public CallStudent() {
    }

    public CallStudent(String id, String sid, String callDate, String callTime) {
        this.id = id;
        this.sid = sid;
        this.callDate = callDate;
        this.callTime = callTime;
    }

    /**
     * 获取
     * @return id
     */
    public String getId() {
        return id;
    }

    /**
     * 设置
     * @param id
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * 获取
     * @return sid
     */
    public String getSid() {
        return sid;
    }

    /**
     * 设置
     * @param sid
     */
    public void setSid(String sid) {
        this.sid = sid;
    }

    /**
     * 获取
     * @return callDate
     */
    public String getCallDate() {
        return callDate;
    }

    /**
     * 设置
     * @param callDate
     */
    public void setCallDate(String callDate) {
        this.callDate = callDate;
    }

    /**
     * 获取
     * @return callTime
     */
    public String getCallTime() {
        return callTime;
    }

    /**
     * 设置
     * @param callTime
     */
    public void setCallTime(String callTime) {
        this.callTime = callTime;
    }

    public String toString() {
        return "CallStudent{id = " + id + ", sid = " + sid + ", callDate = " + callDate + ", callTime = " + callTime + "}";
    }
}
