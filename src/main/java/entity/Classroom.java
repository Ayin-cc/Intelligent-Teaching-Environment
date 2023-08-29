package entity;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class Classroom {
    private String cid;
    private String address;
    private String token;
    private List<Course> courseSchedule;


    public Classroom() {
    }


    public Classroom(String cid, String address, String token, List<Course> courseSchedule) {
        this.cid = cid;
        this.address = address;
        this.token = token;
        this.courseSchedule = courseSchedule;
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
     * @return address
     */
    public String getAddress() {
        return address;
    }

    /**
     * 设置
     * @param address
     */
    public void setAddress(String address) {
        this.address = address;
    }

    /**
     * 获取
     * @return courseSchedule
     */
    public List<Course> getCourseSchedule() {
        return courseSchedule;
    }

    /**
     * 设置
     * @param courseSchedule
     */
    public void setCourseSchedule(List<Course> courseSchedule) {
        this.courseSchedule = courseSchedule;
    }

    public String toString() {
        return "Classroom{cid = " + cid + ", address = " + address + ", courseSchedule = " + courseSchedule + "}";
    }

    /**
     * 获取
     * @return token
     */
    public String getToken() {
        return token;
    }

    /**
     * 设置
     * @param token
     */
    public void setToken(String token) {
        this.token = token;
    }
}
