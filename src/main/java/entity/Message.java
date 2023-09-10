package entity;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.util.List;

@Component
public class Message {
    private int id;
    private String title;
    private String content;
    private String time;
    private String sender;
    private List<Attachment> attachment;
    private List<MultipartFile> attachmentFiles;


    public Message() {
    }

    public Message(int id, String title, String content, String time, String sender, List<Attachment> attachment, List<MultipartFile> attachmentFiles) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.time = time;
        this.sender = sender;
        this.attachment = attachment;
        this.attachmentFiles = attachmentFiles;
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
     * @return sender
     */
    public String getSender() {
        return sender;
    }

    /**
     * 设置
     * @param sender
     */
    public void setSender(String sender) {
        this.sender = sender;
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

    /**
     * 获取
     * @return attachmentFiles
     */
    public List<MultipartFile> getAttachmentFiles() {
        return attachmentFiles;
    }

    /**
     * 设置
     * @param attachmentFiles
     */
    public void setAttachmentFiles(List<MultipartFile> attachmentFiles) {
        this.attachmentFiles = attachmentFiles;
    }

    public String toString() {
        return "Message{id = " + id + ", title = " + title + ", content = " + content + ", time = " + time + ", sender = " + sender + ", attachment = " + attachment + ", attachmentFiles = " + attachmentFiles + "}";
    }
}
