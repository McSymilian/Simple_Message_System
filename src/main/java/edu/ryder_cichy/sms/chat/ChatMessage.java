package edu.ryder_cichy.sms.chat;

public record ChatMessage(
    String senderUUID,
    String content,
    String timestamp
) {
}
