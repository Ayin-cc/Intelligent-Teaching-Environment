package service;

import dao.ChatBoxDao;
import entity.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatBoxServiceImpl implements ChatBoxService {
    @Autowired
    private ChatBoxDao chatBoxDao;

    @Override
    public boolean send(Chat chat){
        chatBoxDao.addChat(chat);
        return true;
    }

    @Override
    public List<Chat> keepAlive(String id) {
        return chatBoxDao.selectChat(id);
    }
}
