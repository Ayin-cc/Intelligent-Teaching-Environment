package util;

import java.util.ArrayList;
import java.util.List;

public class ConvertTime {
    static List<String> sections = new ArrayList<>(){{
            add("08:15:00");
            add("09:10:00");
            add("10:15:00");
            add("11:10:00");
            add("13:50:00");
            add("14:45:00");
            add("15:40:00");
            add("16:45:00");
            add("17:40:00");
            add("19:20:00");
            add("20:15:00");
            add("21:10:00");
        }};

    public static String sectionToTime(Integer section){
        return sections.get(section - 1);
    }

    public static Integer timeToSection(String time){
        for(int i = 0; i < 12; i++){
            if(time.compareTo(sections.get(i)) == 0) {
                return i;
            }
        }
        return 12;
    }
}
