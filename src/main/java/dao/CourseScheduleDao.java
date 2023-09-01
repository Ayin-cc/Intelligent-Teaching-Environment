package dao;

import entity.Course;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseScheduleDao {
    List<Course> selectCourseBySid(@Param("sid")String sid);
}
