package util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import dao.QRCodeDao;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.UUID;

public class QRCodeGenerator {
    private static QRCodeDao qrCodeDao;

    public static String generate(String cid) {
        String data = "https://scuee.com/checkin?id="; // 签到链接前缀
        String base64Code = null;

        // 生成唯一标识符
        UUID uniqueId = UUID.randomUUID();
        String uniqueIdString = uniqueId.toString();

        // 拼接签到链接
        String checkinUrl = data + uniqueIdString;

        // 生成二维码
        String qrCodeFilePath = "resources/qrcode/" + cid + ".png"; // 二维码保存路径
        int size = 250; // 二维码尺寸

        try {
            base64Code = createQRCode(checkinUrl, qrCodeFilePath, size, cid);
            System.out.println("成功生成签到二维码。");

            // TODO 将唯一标识符和其他信息存储到数据库或文件中，用于统计扫描的人


        } catch (WriterException | IOException e) {
            System.out.println("生成签到二维码时出错：" + e.getMessage());
        }

        return base64Code;
    }

    private static String createQRCode(String data, String filePath, int size, String cid)
            throws WriterException, IOException {
        // 设置二维码参数
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        BitMatrix bitMatrix = qrCodeWriter.encode(data, BarcodeFormat.QR_CODE, size, size);
        BufferedImage bufferedImage = new BufferedImage(size, size, BufferedImage.TYPE_INT_RGB);
        bufferedImage.createGraphics();

        // 设置二维码颜色
        int black = 0xFF000000;
        int white = 0xFFFFFFFF;
        for (int x = 0; x < size; x++) {
            for (int y = 0; y < size; y++) {
                bufferedImage.setRGB(x, y, bitMatrix.get(x, y) ? black : white);
            }
        }

        // 保存二维码到文件
        File qrCodeFile = new File(filePath);
        ImageIO.write(bufferedImage, "png", qrCodeFile);

        // 将图片编码成base64
        File file = new File(filePath);
        FileInputStream fileInputStream = new FileInputStream(file);
        byte[] bytes = new byte[(int) file.length()];
        fileInputStream.read(bytes);
        fileInputStream.close();
        String base64String = Base64.getEncoder().encodeToString(bytes);

        // 存入数据库
        qrCodeDao.setQRCode(Integer.parseInt(cid), base64String);

        return base64String;
    }
}
