package entity;

import org.springframework.stereotype.Component;

@Component
public class Student {
    private String sid;
    private String name;
    private String major;
    private String college;
    private String sex;
    private String passwd;
    private String phone;


    public Student() {
    }

    public Student(String sid, String name, String major, String college, String sex, String passwd, String phone) {
        this.sid = sid;
        this.name = name;
        this.major = major;
        this.college = college;
        this.sex = sex;
        this.passwd = passwd;
        this.phone = phone;
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
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * 设置
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取
     * @return major
     */
    public String getMajor() {
        return major;
    }

    /**
     * 设置
     * @param major
     */
    public void setMajor(String major) {
        this.major = major;
    }

    /**
     * 获取
     * @return college
     */
    public String getCollege() {
        return college;
    }

    /**
     * 设置
     * @param college
     */
    public void setCollege(String college) {
        this.college = college;
    }

    /**
     * 获取
     * @return sex
     */
    public String getSex() {
        return sex;
    }

    /**
     * 设置
     * @param sex
     */
    public void setSex(String sex) {
        this.sex = sex;
    }

    /**
     * 获取
     * @return passwd
     */
    public String getPasswd() {
        return passwd;
    }

    /**
     * 设置
     * @param passwd
     */
    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    /**
     * 获取
     * @return phone
     */
    public String getPhone() {
        return phone;
    }

    /**
     * 设置
     * @param phone
     */
    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String toString() {
        return "Student{sid = " + sid + ", name = " + name + ", major = " + major + ", college = " + college + ", sex = " + sex + ", passwd = " + passwd + ", phone = " + phone + "}";
    }
}
