package methods;

import org.springframework.stereotype.Component;

@Component
public class AClass {
    private String name;
    private String teacher;
    private String location;
    private String period;


    public AClass() {
    }

    public AClass(String name, String teacher, String location, String period) {
        this.name = name;
        this.teacher = teacher;
        this.location = location;
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


    public String getLocation() {
        return location;
    }


    public void setLocation(String location) {
        this.location = location;
    }


    public String getPeriod() {
        return period;
    }


    public void setPeriod(String period) {
        this.period = period;
    }

    public String toString() {
        return "Class{name = " + name + ", teacher = " + teacher + ", location = " + location + ", period = " + period + "}";
    }
}
