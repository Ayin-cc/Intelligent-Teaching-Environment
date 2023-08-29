package entity;

import org.springframework.stereotype.Component;

@Component
public class Administrator {
    private String token;
    private String id;
    private String passwd;


    public Administrator() {
    }

    public Administrator(String token, String id, String passwd) {
        this.token = token;
        this.id = id;
        this.passwd = passwd;
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
        return "Administrator{token = " + token + ", id = " + id + ", passwd = " + passwd + "}";
    }
}
