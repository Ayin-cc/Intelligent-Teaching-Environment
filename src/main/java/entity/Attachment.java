package entity;

import org.springframework.stereotype.Component;

@Component
public class Attachment {
    private int id;
    private String file;
    private String name;


    public Attachment() {
    }

    public Attachment(int id, String file, String name) {
        this.id = id;
        this.file = file;
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
    public String getFile() {
        return file;
    }

    /**
     * 设置
     * @param file
     */
    public void setFile(String file) {
        this.file = file;
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
        return "Attachment{id = " + id + ", file = " + file + ", name = " + name + "}";
    }
}
