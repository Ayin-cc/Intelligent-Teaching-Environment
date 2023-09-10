package entity;

import org.springframework.stereotype.Component;

import java.sql.Blob;

@Component
public class Attachment {
    private int id;
    private byte[] file;
    private Blob blob;
    private String name;


    public Attachment() {
    }

    public Attachment(int id, byte[] file, Blob blob, String name) {
        this.id = id;
        this.file = file;
        this.blob = blob;
        this.name = name;
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
     * @return file
     */
    public byte[] getFile() {
        return file;
    }

    /**
     * 设置
     * @param file
     */
    public void setFile(byte[] file) {
        this.file = file;
    }

    /**
     * 获取
     * @return blob
     */
    public Blob getBlob() {
        return blob;
    }

    /**
     * 设置
     * @param blob
     */
    public void setBlob(Blob blob) {
        this.blob = blob;
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

    public String toString() {
        return "Attachment{id = " + id + ", file = " + file + ", blob = " + blob + ", name = " + name + "}";
    }
}
