package methods;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * 如何做成结构良好的周课程表？
 */
@Component
public class DayClassSchedule {
    private ArrayList<AClass> aclass = new ArrayList<>();


    public DayClassSchedule() {
    }

    public DayClassSchedule(int section, AClass cl) {
        this.aclass.set(section, cl);
    }

    public List<AClass> getAclass() {
        return aclass;
    }

    //获取某一节课的数据
    public AClass getSingleAclass(int section){

        if(aclass.get(section) != null){
            return aclass.get(section);
        }
        else{
            System.out.println("Class Not Found!");
            return null;
        }
    }

    public void setSingleAlcass(int section, AClass cl){
        this.aclass.set(section, cl);
    }

    public void setAclass(ArrayList<AClass> aclass) {
        this.aclass = aclass;
    }

}
