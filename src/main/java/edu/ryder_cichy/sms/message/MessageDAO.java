package edu.ryder_cichy.sms.message;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection="messages")
public class MessageDAO {
    @Id
    private ObjectId id;

    private String senderUUID;
    private String receiverUUID;
    private String content;
    private String timestamp;
}
