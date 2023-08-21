package entity;

public class Chat {
    private String sid;
    private String name;
    private String time;
    private String content;


    public Chat() {
    }

    public Chat(String sid, String name, String time, String content) {
        this.sid = sid;
        this.name = name;
        this.time = time;
        this.content = content;
    }

    public String getSid() {
        return sid;
    }

    public void setSid(String sid) {
        this.sid = sid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String toString() {
        return "Chat{sid = " + sid + ", name = " + name + ", time = " + time + ", content = " + content + "}";
    }
}
