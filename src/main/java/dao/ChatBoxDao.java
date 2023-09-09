package dao;

import entity.Chat;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatBoxDao {
    void addChat(@Param("chat")Chat chat);
    List<Chat> selectChat(@Param("id")String id);
    void updateChat(@Param("chat")Chat chat);
}
