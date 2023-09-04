package util;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

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
}
