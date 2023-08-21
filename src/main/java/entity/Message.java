package entity;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Message {
    private String title;
    private String content;
    private String time;
    private List<Attachment> attachment;


    public Message() {
    }

    public Message(String title, String content, String time, List<Attachment> attachment) {
        this.title = title;
        this.content = content;
        this.time = time;
        this.attachment = attachment;
    }

    /**
     * 获取
     * @return title
     */
    public String getTitle() {
        return title;
    }

    /**
     * 设置
     * @param title
     */
    public void setTitle(String title) {
        this.title = title;
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
     * @return attachment
     */
    public List<Attachment> getAttachment() {
        return attachment;
    }

    /**
     * 设置
     * @param attachment
     */
    public void setAttachment(List<Attachment> attachment) {
        this.attachment = attachment;
    }

    public String toString() {
        return "Message{title = " + title + ", content = " + content + ", time = " + time + ", attachment = " + attachment + "}";
    }
}
