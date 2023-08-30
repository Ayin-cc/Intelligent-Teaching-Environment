package service;

import entity.Message;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface DistrMsgService {
    boolean create(String token, Message msg);
    List<Message> keepAlive(String id);
    MultipartFile download(int id, String name);
}
