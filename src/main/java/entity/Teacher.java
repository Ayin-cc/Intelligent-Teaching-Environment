package entity;
import org.springframework.stereotype.Component;

@Component
public class Teacher {
    private int id;
    private String name;
    private String phone;
    private String passwd;


    public Teacher() {
    }

    public Teacher(int id, String name, String phone, String passwd) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.passwd = passwd;
    }

    /**
     * 获取
     * @return id
     */
    public int getId() {
        return id;
    }

    /**
     * 设置
     * @param id
     */
    public void setId(int id) {
        this.id = id;
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

    public String toString() {
        return "Teacher{id = " + id + ", name = " + name + ", phone = " + phone + ", passwd = " + passwd + "}";
    }
}
