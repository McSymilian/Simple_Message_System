package edu.ryder_cichy.sms.chat;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class ChatService {
    private MessagesRepository messagesRepository;

    public List<ChatMessageResponse> findAllMessages() {
        return messagesRepository.findAll()
                .stream()
                .map(it ->
                        new ChatMessageResponse(
                                it.getUsername(),
                                it.getContent(),
                                it.getTimestamp()
                                )
                )
                .toList();
    }

    public ChatMessage saveMassage(ChatMessage chatMessage, Principal principal) {
        messagesRepository.save(ChatMessageDAO
                .builder()
                .content(chatMessage.content())
                .username(principal.getName())
                .timestamp(LocalDate.now().toString())
                .build()
        );

        return chatMessage;
    }
}