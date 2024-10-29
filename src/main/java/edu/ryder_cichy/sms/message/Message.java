package edu.ryder_cichy.sms.message;

import lombok.Data;

@Data
public class Message {
    private String senderUUID;
    private String receiverUUID;
    private String content;
    private String timestamp;
}
