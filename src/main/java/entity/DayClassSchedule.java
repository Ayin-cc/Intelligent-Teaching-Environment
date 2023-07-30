package entity;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 如何做成结构良好的周课程表？
 */
@Component
public class DayClassSchedule {
    private ArrayList<Course> aclass = new ArrayList<>();


    public DayClassSchedule() {
    }

    public DayClassSchedule(int section, Course cl) {
        this.aclass.set(section, cl);
    }

    public List<Course> getAclass() {
        return aclass;
    }

    //获取某一节课的数据
    public Course getSingleAclass(int section) {

        if (aclass.get(section) != null) {
            return aclass.get(section);
        } else {
            System.out.println("Class Not Found!");
            return null;
        }
    }

    public void setSingleAlcass(int section, Course cl) {
        this.aclass.set(section, cl);
    }

    public void setAclass(ArrayList<Course> aclass) {
        this.aclass = aclass;
    }

}
