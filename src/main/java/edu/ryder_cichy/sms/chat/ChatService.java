package edu.ryder_cichy.sms.chat;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
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

    public ChatMessageResponse saveMassage(ChatMessage chatMessage, Principal principal) {
        messagesRepository.save(ChatMessageDAO
                .builder()
                .content(chatMessage.content())
                .username(principal.getName())
                .timestamp(LocalDateTime.now().toString())
                .build()
        );

        return ChatMessageResponse
                .builder()
                .content(chatMessage.content())
                .username(principal.getName())
                .timestamp(LocalDateTime.now().toString())
                .build();
    }
}