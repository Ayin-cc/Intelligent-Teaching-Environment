package dao;

import entity.*;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {
    int checkStudent(@Param("student")Student student);
    int checkTeacher(@Param("teacher")Teacher teacher);
    int checkAdministrator(@Param("administrator")Administrator administrator);
    int queryStudent(@Param("sid")String sid);
    int queryTeacher(@Param("id")String id);
    void updateStudent(@Param("student")Student student);
    void updateTeacher(@Param("teacher")Teacher teacher);
    void addAdministrator(@Param("administrator")Administrator administrator);
    int checkToken(@Param("token")String token);
    void updateStudentToken(@Param("id")String id, @Param("token")String token);
    void updateClassroomToken(@Param("id")String id, @Param("token")String token);
    void updateAdministratorToken(@Param("id")String id, @Param("token")String token);
    List<Message> selectMsg();
    List<Course> selectCourse(@Param("classroom")Classroom classroom, @Param("date")String date);
    Student selectStudentById(@Param("sid") String sid);
}
