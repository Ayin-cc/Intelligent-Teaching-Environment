package serve;

import config.SpringConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.stereotype.Service;
import sql.QRCodeDao;
import util.CheckUid;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/QRCode")
@Service
public class QRCodeService extends HttpServlet {
    @Autowired
    private QRCodeDao qrCodeDao;

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    public void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");


        String uid;
        BufferedReader reader = req.getReader();
        uid = reader.readLine();


        //判断教室uid是否存在
        if(uid != null){
            //uid在数据库中存在
            if (CheckUid.checkClassroom(Integer.parseInt(uid))) {
                //发送响应数据-二维码JSON
                resp.setStatus(200);
                resp.setHeader("Server", "QRCode");
                resp.getWriter().write(qrCodeDao.getQRCode(Integer.parseInt(uid)));
            }
            else{
                resp.setStatus(200);
                resp.setHeader("Server", "QRCode");
                resp.getWriter().write("<h1>Uid Not Found!</h1>");
            }
        }
        else{
            resp.setStatus(200);
            resp.setHeader("Server", "QRCode");
            resp.getWriter().write("<h1>Illegal Uid!</h1>");
            resp.getWriter().write("<h1>Please check your device!</h1>");
        }

        System.out.println(uid);

    }

    @Override
    public void destroy(){
        super.destroy();
    }

}
