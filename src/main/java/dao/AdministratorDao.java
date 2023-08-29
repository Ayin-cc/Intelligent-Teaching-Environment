package dao;

import entity.Classroom;
import entity.Course;
import entity.Student;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AdministratorDao {
    String selectCidBySite(@Param("site")String site);
    int addStudent(@Param("student")Student student);
    int addClassroom(@Param("classroom")Classroom classroom);
    int addCourseInf(@Param("course")Course course);
    int addCourseSchedule(@Param("cid")String cid, @Param("section")int section, @Param("id")String id, @Param("date")String date);
    int addStudentToCourse(@Param("id")String id, @Param("sid")String sid);
    int changeStudent(@Param("student")Student student);
    int changeClassroom(@Param("classroom")Classroom classroom);
    int changeCourseInf(@Param("course")Course course);
    int changeCourseSchedule(@Param("cid")String cid, @Param("section")int section, @Param("id")String id, @Param("date")String date);
    List<Student> queryStudent(@Param("sid")String sid, @Param("name")String name, @Param("major")String major, @Param("college")String college, @Param("phone")String phone);
    List<Classroom> queryClassroom(@Param("cid")String cid, @Param("address")String address);
    List<Course> queryCourse(@Param("id")String id, @Param("name")String name, @Param("teacher")String teacher);
    int deleteStudent(@Param("student")Student student);
    int deleteClassroom(@Param("classroom")Classroom classroom);
    int deleteCourseInf(@Param("course")Course course);
    int deleteCourseSchedule(@Param("id")String id);
    int deleteStudentFromCourse(@Param("id")String id, @Param("sid") String sid);
    int checkToken(@Param("token") String token);
}
