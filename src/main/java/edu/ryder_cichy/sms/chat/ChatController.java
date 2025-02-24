package edu.ryder_cichy.sms.chat;

import edu.ryder_cichy.sms.user.UserService;
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
    private final UserService userService;

    @MessageMapping("/messages")
    @SendTo("/sms/chat")
    public ChatMessage sendNewMessage(ChatMessage chatMessage, Principal principal) {
        chatMessage = new ChatMessage(userService.getUuidByUsername(principal.getName()), chatMessage.content(), chatMessage.timestamp());
        System.out.println("New message: " + chatMessage + " from " + principal.getName());
        return chatService.saveMassage(chatMessage);
    }

    @GetMapping("chat_history")
    public List<ChatMessage> getChatHistory() {
        return chatService.findAllMessages();
    }

}
