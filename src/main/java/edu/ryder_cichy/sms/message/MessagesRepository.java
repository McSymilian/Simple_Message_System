package edu.ryder_cichy.sms.message;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.CrudRepository;

public interface MessagesRepository extends MongoRepository<MessageDAO, String> {
}
