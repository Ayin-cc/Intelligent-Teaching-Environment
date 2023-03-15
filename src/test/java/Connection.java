import methods.Classroom;
import sql.SQLConnection;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Connection {
    public static String getQRCode(int uid){
        Classroom classroom = new Classroom();
        SQLConnection sql = new SQLConnection();
        PreparedStatement pstmt = null;
        ResultSet code = null;
        String result = null;

        try{
            sql.sqlConnection();

            String sqlCommand = "select qrcode from classroom where id = " + uid + ";";
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
}
