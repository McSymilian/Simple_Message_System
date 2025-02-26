package edu.ryder_cichy.sms.chat;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ChatService {
    private MessagesRepository messagesRepository;

    public List<ChatMessage> findAllMessages() {
        return messagesRepository.findAll()
                .stream()
                .map(it ->
                        new ChatMessage(
                                it.getSenderUUID(),
                                it.getContent(),
                                it.getTimestamp()
                                )
                )
                .toList();
    }

    public ChatMessage saveMassage(ChatMessage chatMessage) {
        messagesRepository.save(ChatMessageDAO
                .builder()
                .content(chatMessage.content())
                .senderUUID(chatMessage.senderUUID()) // principal.getname()
                .timestamp(chatMessage.timestamp()) // TODO localdate.now
                .build()
        );

        return chatMessage;
    }
}