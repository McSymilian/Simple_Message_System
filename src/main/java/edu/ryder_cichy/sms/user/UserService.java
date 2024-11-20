package edu.ryder_cichy.sms.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public ResponseEntity<String> login(String username, String password) {
        return ResponseEntity.ok(userRepository.findByUsernameAndPassword(username, password)
                .orElseThrow(NoSuchUserException::new)
                .getUuid()
        );
    }

    public ResponseEntity<String> register(String username, String password) {
        if (userRepository.findByUsernameAndPassword(username, password).isPresent())
            throw new UserExistsException();

        User registeredUser = User
                .builder()
                .username(username)
                .password(password)
                .build();

        userRepository.save(registeredUser);

        return ResponseEntity.ok(registeredUser.getUuid());
    }

    public ResponseEntity<String> noSuchUserHandling() {
        return ResponseEntity.badRequest().body("Given username or password is incorrect");
    }

    public ResponseEntity<String> userExistsHandling() {
        return ResponseEntity.badRequest().body("Given username is already taken");
    }

    public ResponseEntity<String> getUsernameByUuid(String uuid) {
        return ResponseEntity.ok(userRepository.findById(uuid)
                .orElseThrow(NoSuchUserException::new)
                .getUsername()
        );
    }
}
