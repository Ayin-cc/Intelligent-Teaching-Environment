package service;

import entity.Chat;

import java.util.List;

public interface ChatBoxService {
    boolean send(Chat chat);
    List<Chat> keepAlive(String id);
}
