package service;

import dao.DistrMsgDao;
import entity.Attachment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import entity.Message;
import org.springframework.web.multipart.MultipartFile;
import util.FileByte;

import javax.sql.rowset.serial.SerialBlob;
import java.io.FileInputStream;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DistrMsgServiceImpl implements DistrMsgService {
    @Autowired
    private DistrMsgDao msgDao;


    @Override
    public boolean create(String token, Message msg) {
        System.out.println(token);
        System.out.println(msg.toString());

        if(msgDao.checkToken(token) == 1){
            msgDao.addMsg(msg);
            if(msg.getAttachmentFiles().size() == 0){
                msgDao.addAttachment(msg.getId(), "", null);
                return true;
            }
            for(int i  = 0; i < msg.getAttachmentFiles().size(); i++){
                byte[] file = null;
                String name = null;
                try {
                    file = msg.getAttachmentFiles().get(i).getBytes();
                    name = msg.getAttachmentFiles().get(i).getOriginalFilename();
                    System.out.println(name);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
                msgDao.addAttachment(msg.getId(), name, file);
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
            for (int j = 0; j < msg.get(i).getAttachment().size(); j++) {
                Attachment attachment = msg.get(i).getAttachment().get(j);
                try {
                    attachment.setFile(FileByte.blobToByteArray(attachment.getBlob()));
                } catch (SQLException e) {
                    throw new RuntimeException(e);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
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
