package service;

import dao.DistrMsgDao;
import entity.Attachment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import entity.Message;
import org.springframework.web.multipart.MultipartFile;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class DistrMsgServiceImpl implements DistrMsgService {
    @Autowired
    private DistrMsgDao msgDao;


    @Override
    public boolean create(String token, Message msg) {
        if(msgDao.checkToken(token) == 1){
            msgDao.addMsg(msg);
            if(msg.getAttachment().size() == 0){
                msgDao.addAttachment(msg.getId(), "", null);
                return true;
            }
            for(int i = 0; i < msg.getAttachment().size(); i++){
                msgDao.addAttachment(msg.getId(), msg.getAttachment().get(i).getName(), msg.getAttachment().get(i).getFile());
            }
            return true;
        }
        return false;
    }

    @Override
    public List<Message> keepAlive() {
        Date time = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String timeStr = format.format(time);
        List<Message> msg = msgDao.selectReadyMsg(timeStr);
        for (int i = 0; i < msg.size(); i++) {
            msgDao.updateMsg(msg.get(i));
        }
        return msg;
    }

    @Override
    public Attachment download(int id, String name) {
        Attachment file = msgDao.selectAttachment(id, name);
        return file;
    }

    @Override
    public Message get(int id) {
        Message message = msgDao.selectMsgById(id);
        return message;
    }
}
