package edu.ryder_cichy.sms.message;

public record Message (
    String senderUUID,
    String receiverUUID,
    String content,
    String timestamp
) {
}
