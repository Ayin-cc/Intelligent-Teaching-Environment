package entity;

import org.springframework.stereotype.Component;

@Component
public class Course {
    private String name;
    private String teacher;
    private String site;
    private String period;


    public Course() {
    }

    public Course(String name, String teacher, String site, String period) {
        this.name = name;
        this.teacher = teacher;
        this.site = site;
        this.period = period;
    }


    public String getName() {
        return name;
    }


    public void setName(String name) {
        this.name = name;
    }


    public String getTeacher() {
        return teacher;
    }


    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }


    public String getSite() {
        return site;
    }


    public void setSite(String site) {
        this.site = site;
    }


    public String getPeriod() {
        return period;
    }


    public void setPeriod(String period) {
        this.period = period;
    }

    public String toString() {
        return "Class{name = " + name + ", teacher = " + teacher + ", site = " + site + ", period = " + period + "}";
    }
}
