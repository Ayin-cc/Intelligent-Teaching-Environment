package entity;

public class Token {
    private String token;

    public Token() {
    }

    public Token(String token) {
        this.token = token;
    }

    /**
     * 获取
     * @return token
     */
    public String getToken() {
        return token;
    }

    /**
     * 设置
     * @param token
     */
    public void setToken(String token) {
        this.token = token;
    }

    public String toString() {
        return "Token{token = " + token + "}";
    }
}
