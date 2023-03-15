package sql;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SQLConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/scuee";
    private static final String NAME = "root";
    private static final String PASSWORD = "12345678";
    public Connection conn = null;

    public void sqlConnection() {
        //加载驱动
        try {
            Class.forName("com.mysql.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            System.out.println("未能成功加载驱动程序，请检查是否导入驱动程序！");
            e.printStackTrace();
        }

        try {
            conn = DriverManager.getConnection(URL, NAME, PASSWORD);
            System.out.println("获取数据库连接成功！");
        } catch (SQLException e) {
            System.out.println("获取数据库连接失败！");
            e.printStackTrace();
        }
    }

    public void sqlClose() {
        if(conn!=null) {
            try {
                conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
                conn=null;
            }
        }
    }

}
