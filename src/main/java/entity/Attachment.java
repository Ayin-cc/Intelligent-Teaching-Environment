package entity;

import org.springframework.stereotype.Component;

@Component
public class Attachment {
    private String name;
    private String url;


    public Attachment() {
    }

    public Attachment(String name, String url) {
        this.name = name;
        this.url = url;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String toString() {
        return "Attachment{name = " + name + ", url = " + url + "}";
    }
}
