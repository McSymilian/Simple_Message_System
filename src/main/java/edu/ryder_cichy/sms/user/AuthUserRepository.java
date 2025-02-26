package edu.ryder_cichy.sms.user;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface AuthUserRepository extends MongoRepository<AuthUser, String> {
        Optional<AuthUser> findByUsernameAndPassword(String username, String password);
        Optional<AuthUser> findByUsername(String username);
}
