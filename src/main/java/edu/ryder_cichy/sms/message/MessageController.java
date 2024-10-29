package edu.ryder_cichy.sms.message;

import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
@AllArgsConstructor
public class MessageController {
    private final MessageService messageService;

//    @MessageMapping("/message")
//    @SendTo("/sms/chat")
//    public Message send(Message message) {
//        return message;
//    }

    @SendTo("/sms/chat")
    public List<Message> getChatHistory(String senderUUID, String receiverUUID) {
        return messageService.findAllMessagesByReceiverUUID(receiverUUID);
    }
}
