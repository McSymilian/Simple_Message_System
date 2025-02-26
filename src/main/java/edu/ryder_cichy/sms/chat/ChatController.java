package edu.ryder_cichy.sms.chat;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@AllArgsConstructor
public class ChatController {
    private final ChatService chatService;

    @MessageMapping("/messages")
    @SendTo("/sms/chat")
    public ChatMessage sendNewMessage(ChatMessage chatMessage, Principal principal) {
        System.out.println("New message: " + chatMessage.toString());
        return chatService.saveMassage(chatMessage, principal);
    }

    @GetMapping("chat_history")
    public List<ChatMessageResponse> getChatHistory() {
        return chatService.findAllMessages();
    }

}
