import java.io.*;
import java.nio.file.*;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Scanner;

public class test {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("请输入文件路径：");
        String filePath = scanner.nextLine();

        try {
            // 读取文件内容
            byte[] fileData = Files.readAllBytes(Paths.get(filePath));

            // 将文件内容转换为Blob格式
            Blob blobData = new javax.sql.rowset.serial.SerialBlob(fileData);

            // 获取文件名（不带路径）
            String fileName = Paths.get(filePath).getFileName().toString();

            // 创建输出文件的路径
            String txtOutputFilePath = Paths.get(filePath).getParent().resolve(fileName + ".txt").toString();

            // 创建bin文件的路径
            String binOutputFilePath = Paths.get(filePath).getParent().resolve("bin_" + fileName + ".txt").toString();

            // 将Blob数据写入到输出txt文件
            try (OutputStream txtOutputStream = new FileOutputStream(txtOutputFilePath)) {
                InputStream inputStream = blobData.getBinaryStream();
                byte[] buffer = new byte[1024];
                int bytesRead;
                while ((bytesRead = inputStream.read(buffer)) != -1) {
                    txtOutputStream.write(buffer, 0, bytesRead);
                }
                System.out.println("File converted and saved to: " + txtOutputFilePath);
            } catch (IOException e) {
                e.printStackTrace();
            }

            // 将原文件的byte[]格式写入bin文件
            try (OutputStream binOutputStream = new FileOutputStream(binOutputFilePath)) {
                binOutputStream.write(fileData);
                System.out.println("Binary data saved to: " + binOutputFilePath);
            } catch (IOException e) {
                e.printStackTrace();
            }
        } catch (IOException | SQLException e) {
            e.printStackTrace();
        } finally {
            scanner.close();
        }
    }
}
