package edu.ryder_cichy.sms.chat;

import lombok.Builder;

@Builder
public record ChatMessageResponse(
    String username,
    String content,
    String timestamp
) {
}
