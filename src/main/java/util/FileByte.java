package util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Blob;
import java.sql.SQLException;

public class FileByte {
    public static byte[] inputSwitchByte(InputStream input){
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        int len = 0;
        byte[] result = null;
        byte[] bt = new byte[2048];
        try {
            while( (len=input.read(bt)) != -1){
                baos.write(bt, 0, len);
            }
            result = baos.toByteArray();
            baos.close();
            input.close();
        } catch (IOException e) {
            System.out.print("IO操作失败");
        }finally{
            if (null != baos) {
                try {
                    baos.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            if (null != input) {
                try {
                    input.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return result;
    }

    public static byte[] blobToByteArray(Blob blob) throws SQLException, IOException {
        try (InputStream inputStream = blob.getBinaryStream()) {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            byte[] buffer = new byte[1048576];
            int bytesRead;
            while ((bytesRead = inputStream.read(buffer)) != -1) {
                byteArrayOutputStream.write(buffer, 0, bytesRead);
            }
            return byteArrayOutputStream.toByteArray();
        }
    }
}
