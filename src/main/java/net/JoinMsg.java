package net;

import com.fasterxml.jackson.databind.ObjectMapper;
import config.SpringConfig;
import methods.Message;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import sql.DistrMsgDao;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/JoinMsg")
public class JoinMsg extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        // 读取要发送的消息
        ObjectMapper mapper = new ObjectMapper();
        Message message = mapper.readValue(req.getInputStream(), Message.class);

        // 存入数据库
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
        DistrMsgDao msgDao = ctx.getBean(DistrMsgDao.class);
        msgDao.setMsg(message);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
    }

    @Override
    public void destroy() {
        super.destroy();
    }
}
