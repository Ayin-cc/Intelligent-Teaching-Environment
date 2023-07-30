package entity;

import org.springframework.stereotype.Component;

@Component
public class Message {
    private String content;
    private int type;
    private int length;
    private String time;

    public Message(int type, String msg, String time) {
        this.type = type;
        this.content = msg;
        this.time = time;
    }


    // 添加消息
    public void addMsg(String msg, int type, String time) {
        this.content = msg;
        this.type = type;
        this.time = time;
        length++;
    }

    public String ToString() {
        return this.type + ":" + this.content;
    }

}
