package dao;

import entity.Student;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CallStuDao {
    int checkToken(@Param("token")String token);
    List<Student> selectStudentByUid(@Param("uid")String uid);
    int addCallStudent(@Param("id")String id, @Param("date")String date, @Param("time")String time, @Param("sid")String sid);
}
