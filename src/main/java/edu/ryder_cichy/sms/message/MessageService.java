package edu.ryder_cichy.sms.message;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class MessageService {
    private MessagesRepository messagesRepository;

    public List<Message> findAllMessagesByReceiverUUID(String receiverUUID) {
        return messagesRepository.findAllByReceiverUUID(receiverUUID)
                .stream()
                .map(it ->
                        new Message(
                                it.getSenderUUID(),
                                it.getReceiverUUID(),
                                it.getContent(),
                                it.getTimestamp()
                                )
                )
                .toList();
    }

}
