package edu.ryder_cichy.sms.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
        Optional<User> findByUsernameAndPassword(String username, String password);
}
