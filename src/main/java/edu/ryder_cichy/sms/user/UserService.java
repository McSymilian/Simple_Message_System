package edu.ryder_cichy.sms.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserDetailsManager userDetailsManager;

    public ResponseEntity<String> login(String username, String password) {
        return ResponseEntity.ok(userRepository.findByUsernameAndPassword(username, password)
                .orElseThrow(NoSuchUserException::new)
                .getUuid()
        );
    }

    public ResponseEntity<String> register(String username, String password) {
        if (userRepository.findByUsername(username).isPresent())
            throw new UserExistsException();

        User registeredUser = User
                .builder()
                .username(username)
                .password(password)
                .build();

        userDetailsManager.createUser(org.springframework.security.core.userdetails.User.builder().username(username).password("{noop}"+password).build());

        return ResponseEntity.ok(userRepository.save(registeredUser).getUuid());
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

    public String getUuidByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(NoSuchUserException::new)
                .getUuid();
    }
}
