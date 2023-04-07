package sql;

import methods.Classroom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

@Repository
public class QRCodeDao {
    @Autowired
    private SQLConnection sql;

    //判断教室是否存在
    public Boolean exist(int cid){
        Classroom classroom = new Classroom();
        classroom.setId(cid);
        PreparedStatement pstmt = null;
        ResultSet result = null;
        boolean flag = false;

        sql.sqlConnection();
        String sqlCommand = "select * from classroom where id = " + cid;
        try {
            pstmt = sql.conn.prepareStatement(sqlCommand);
            result = pstmt.executeQuery();
            while(result.next()){
                if(!result.getBoolean(1)) {
                    flag = false;
                    System.out.println("教室不存在");
                }
                else {
                    flag = true;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        sql.sqlClose();

        return flag;
    }

    //从数据库获取二维码给教室端
    public String getQRCode(int cid){
        Classroom classroom = new Classroom();
        PreparedStatement pstmt = null;
        ResultSet code = null;
        String result = null;

        try{
            sql.sqlConnection();

            String sqlCommand = "select qrcode from classroom where id = " + cid + ";";
            pstmt = sql.conn.prepareStatement(sqlCommand);
            code = pstmt.executeQuery(sqlCommand);
            while(code.next()){
                result = code.getString(1);
            }

            sql.sqlClose();
        }catch (Exception e){
            e.printStackTrace();
        }

        return result;
    }

    //将二维码存入数据库
    public void setQRCode(int cid, String code){
        SQLConnection sql = new SQLConnection();
        PreparedStatement pstmt = null;

        try{
            sql.sqlConnection();

            String sqlCommand = "insert" + code + "into qrcode" + "where id = " + cid + ";";
            pstmt = sql.conn.prepareStatement(sqlCommand);
            pstmt.executeQuery();

            sql.sqlClose();
        } catch (Exception e){
            e.printStackTrace();
        }

    }
}
