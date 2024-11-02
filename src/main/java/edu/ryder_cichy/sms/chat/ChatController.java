package edu.ryder_cichy.sms.chat;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/messages")
    @SendTo("/sms/chat")
    public ChatMessage sendNewMessage(ChatMessage chatMessage) {
        return chatService.saveMassage(chatMessage);
    }

    @GetMapping("chat_history")
    public List<ChatMessage> getChatHistory() {
        return chatService.findAllMessages();
    }

}
