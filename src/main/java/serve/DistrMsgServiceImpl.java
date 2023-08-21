package serve;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dao.DistrMsgDao;
import entity.Message;

@Service
public class DistrMsgServiceImpl implements DistrMsgService {
    @Autowired
    private DistrMsgDao msgDao;

    @Override
    public void create(Message msg){

    }

    @Override
    public void get(){

    }
}
