package edu.ryder_cichy.sms.chat;

import lombok.Builder;
import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection="messages")
public class ChatMessageDAO {
    @Id
    private ObjectId id;
    private String username;
    private String content;
    private String timestamp;
}
