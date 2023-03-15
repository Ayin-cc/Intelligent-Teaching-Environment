package serve;

import methods.MsgList;
import sql.DistrMsgDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/DistrMsg")
public class DistrMsgService extends HttpServlet {
    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }

    //分发消息
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException{
        // 从队列中获取消息
        MsgList msgList = new MsgList();
        msgList = DistrMsgDao.getMsgList();

        // 按类型分发
        for (int i = 0; i < msgList.length; i++) {
            // 重要通知
            if(msgList.type.remove() == "1"){

            }

            // 普通通知
            else if(msgList.type.remove() == "2"){

            }

            // 宣传
            else if(msgList.type.remove() == "3"){

            }

        }
    }

    @Override
    public void destroy(){
        super.destroy();
    }
}
