package serve;

public interface QuesService {
    void start(String cid);
    void rob(String sid);
    void answer(String sid, String content);
}
