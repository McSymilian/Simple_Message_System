package edu.ryder_cichy.sms.chat;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDateTime;
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
        if (!validateMessageContent(chatMessage.content())) {
            throw new NonValidMessageContentException();
        }
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

    private boolean validateMessageContent(String content) {
        return content != null && !content.isEmpty() && content.length() <= 2000;
    }

    public ResponseEntity<String> nonValidMessageContentHandling() {
        return ResponseEntity.badRequest().body("Message content is not valid");
    }
}