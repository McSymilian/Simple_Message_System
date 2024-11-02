package edu.ryder_cichy.sms.chat;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessagesRepository extends MongoRepository<ChatMessageDAO, String> {
    List<ChatMessageDAO> findAllBy();
}
