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
    void addStudent(@Param("student")Student student);
    void addClassroom(@Param("classroom")Classroom classroom);
    void addCourseInf(@Param("course")Course course);
    void addCourseSchedule(@Param("cid")String cid, @Param("section")int section, @Param("id")String id, @Param("date")String date);
    void addStudentToCourse(@Param("id")String id, @Param("sid")String sid);
    void changeStudent(@Param("student")Student student);
    void changeClassroom(@Param("classroom")Classroom classroom);
    void changeCourseInf(@Param("course")Course course);
    void changeCourseSchedule(@Param("cid")String cid, @Param("section")int section, @Param("id")String id, @Param("date")String date);
    List<Student> queryStudent(@Param("sid")String sid, @Param("name")String name, @Param("major")String major, @Param("college")String college, @Param("phone")String phone);
    List<Classroom> queryClassroom(@Param("cid")String cid, @Param("address")String address);
    List<Course> queryCourse(@Param("id")String id, @Param("name")String name, @Param("teacher")String teacher);
    void deleteStudent(@Param("student")Student student);
    void deleteClassroom(@Param("classroom")Classroom classroom);
    void deleteCourseInf(@Param("course")Course course);
    void deleteCourseSchedule(@Param("id")String id);
    void deleteStudentFromCourse(@Param("id")String id, @Param("sid") String sid);
    int checkToken(@Param("token") String token);
}
