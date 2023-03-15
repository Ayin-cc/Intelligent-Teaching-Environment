package methods;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class MsgList {
    public Queue msg = new LinkedList();
    public Queue type = new LinkedList();
    public int length;

    //将消息添加至队列中
    void addMsg(String msg, int type){
        this.msg.add(msg);
        this.type.add(type);
        length++;
    }

    //获取队列最前方的消息
    String getMsg(int index){
        return this.type.element() + ":" + this.msg.element();
    }

    //移除队列最前方的消息
    String removeMsg(){
        return this.type.remove() + ":" + this.msg.remove();
    }


}
