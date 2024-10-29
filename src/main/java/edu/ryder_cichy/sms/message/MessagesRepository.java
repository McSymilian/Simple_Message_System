package edu.ryder_cichy.sms.message;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessagesRepository extends MongoRepository<MessageDAO, String> {
    List<MessageDAO> findAllByReceiverUUID(String receiverUUID);
}
