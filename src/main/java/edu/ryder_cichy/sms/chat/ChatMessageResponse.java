package edu.ryder_cichy.sms.chat;

public record ChatMessageResponse(
    String username,
    String content,
    String timestamp
) {
}
