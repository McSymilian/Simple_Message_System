package edu.ryder_cichy.sms.chat;

public record ChatMessage(
    String senderUUID, // TODO remove this field
    String content,
    String timestamp // TODO remove this field
) {
}
