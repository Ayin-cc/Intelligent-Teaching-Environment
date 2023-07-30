package serve;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dao.DistrMsgDao;
import entity.Message;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;

@WebServlet("/DistrMsg")
@Service
public class DistrMsgServiceImpl extends HttpServlet implements serve.DistrMsgService {
    @Autowired
    private DistrMsgDao msgDao;

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
    }


    //分发消息
    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // 从数据库中获取消息
        while (true) {
            Message message;
            message = msgDao.getMsg();

            // 使用SSE, 用于发送消息
            resp.setContentType("text/event-stream");
            resp.setHeader("Cache-Control", "no-cache, no-store, max-age=0, must-revalidate");
            //resp.setHeader("Expires", "0");

            // 分发消息
            String msg = message.ToString();
            System.out.println(msg);
            new Thread(() -> {
                try {
                    Writer writer = resp.getWriter();
                    writer.write("event:message\n");
                    writer.write("data:" + msg + "\n\n");
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }).start();
        }
    }

    @Override
    public void destroy() {
        super.destroy();
    }
}
