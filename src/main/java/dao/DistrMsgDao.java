package dao;

import entity.Message;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Repository
public interface DistrMsgDao {
    void addMsg(@Param("msg") Message msg);
    void addAttachment(@Param("id")int id, @Param("name")String name, @Param("file")MultipartFile file);
    List<Message> selectReadyMsg(@Param("time")String time);
    MultipartFile selectAttachment(@Param("id")int id, @Param("name")String name);
    int checkToken(@Param("token")String token);
    void updateMsg(@Param("msg")Message msg);
}
