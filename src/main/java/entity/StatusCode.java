package entity;

public class StatusCode {
    private int statusCode;
    /*
        0 - 操作失败
        1 - 操作成功
     */

    public StatusCode() {
    }

    public StatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    /**
     * 获取
     * @return statusCode
     */
    public int getStatusCode() {
        return statusCode;
    }

    /**
     * 设置
     * @param statusCode
     */
    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String toString() {
        return "StatusCode{statusCode = " + statusCode + "}";
    }
}
