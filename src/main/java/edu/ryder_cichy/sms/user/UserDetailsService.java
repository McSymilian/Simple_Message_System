package edu.ryder_cichy.sms.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(NoSuchUserException::new);

        var springUser = org.springframework.security.core.userdetails.User
                .withUsername(user.getUsername())
                .password(user.getPassword())
                .roles("USER")
                .build();

        return springUser;
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
