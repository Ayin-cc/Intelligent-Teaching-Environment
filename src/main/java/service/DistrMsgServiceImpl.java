package service;

import dao.DistrMsgDao;
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
            for(int i = 0; i < msg.getAttachment().size(); i++){
                msgDao.addAttachment(msg.getId(), msg.getAttachment().get(i).getOriginalFilename(), msg.getAttachment().get(i));
            }
        }
        return false;
    }

    @Override
    public List<Message> keepAlive(String id) {
        Date time = new Date();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String timeStr = format.format(time);
        List<Message> msg = msgDao.selectReadyMsg(timeStr);
        return msg;
    }

    @Override
    public MultipartFile download(int id, String name) {
        MultipartFile file = msgDao.selectAttachment(id, name);
        return file;
    }
}
