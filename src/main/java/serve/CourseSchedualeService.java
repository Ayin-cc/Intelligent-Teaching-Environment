package serve;

import entity.Course;

import java.util.List;

public interface CourseSchedualeService {
    void get(String sid);
    void change(List<Course> set);
}
