package entity;

import org.springframework.stereotype.Component;

@Component
public class Chat {
    private String cid;
    private String sid;
    private String name;
    private String time;
    private String content;

    public Chat() {
    }

    public Chat(String cid, String sid, String name, String time, String content) {
        this.cid = cid;
        this.sid = sid;
        this.name = name;
        this.time = time;
        this.content = content;
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
     * @return content
     */
    public String getContent() {
        return content;
    }

    /**
     * 设置
     * @param content
     */
    public void setContent(String content) {
        this.content = content;
    }

    public String toString() {
        return "Chat{cid = " + cid + ", sid = " + sid + ", name = " + name + ", time = " + time + ", content = " + content + "}";
    }
}
