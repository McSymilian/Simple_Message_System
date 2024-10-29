package edu.ryder_cichy.sms.message;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {
    @MessageMapping("/message")
    @SendTo("/sms/chat")
    public Message send(Message message) {
        return message;
    }
}
