package util;

import java.util.Random;

public class GenerateToken {
    private static char[] CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".toCharArray();
    private static Random random = new Random();

    public static String generateToken(){
        String result = "";
        for (int i = 0; i < 30; i++) {
            char c = CHARACTERS[random.nextInt(CHARACTERS.length)];
            result += c;
        }
        return result;
    }
}
