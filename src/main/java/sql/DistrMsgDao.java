package sql;

import methods.Message;
import org.springframework.stereotype.Repository;

@Repository
public class DistrMsgDao {
    //将消息队列放入数据库
    public void setMsg(Message message){

    }

    //从数据库中获取消息队列
    public Message getMsg(){

        return null;
    }
}
