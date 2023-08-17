package serve;

import dao.QuesDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuesServiceImpl implements QuesService {
    @Autowired
    private QuesDao quesDao;

    @Override
    public void start(String cid){

    }

    @Override
    public void rob(String sid){

    }

    @Override
    public void answer(String sid, String content){

    }
}
