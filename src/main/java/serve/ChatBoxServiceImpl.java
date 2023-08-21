package serve;

import dao.ChatBoxDao;
import entity.Chat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatBoxServiceImpl implements ChatBoxService {
    @Autowired
    private ChatBoxDao chatBoxDao;

    @Override
    public void send(Chat chat){

    }
}
