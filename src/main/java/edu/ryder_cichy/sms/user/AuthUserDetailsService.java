package edu.ryder_cichy.sms.user;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthUserDetailsService implements UserDetailsService {
    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) {
        AuthUser authUser = authUserRepository.findByUsername(username)
                .orElseThrow(NoSuchUserException::new);

        return User
                .withUsername(authUser.getUsername())
                .password(authUser.getPassword())
                .roles("USER")
                .build();
    }

    public ResponseEntity<?> registerUser(AuthUser authUser) {
        try {
            if (authUserRepository.findByUsername(authUser.getUsername()).isPresent())
                return ResponseEntity
                        .status(HttpServletResponse.SC_CONFLICT)
                        .body("Username already taken. Please try again");

            authUser.setPassword(passwordEncoder.encode(authUser.getPassword()));
            authUserRepository.save(authUser);

            return ResponseEntity.ok(HttpServletResponse.SC_CREATED);

        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }

    public ResponseEntity<String> noSuchUserHandling() {
        return ResponseEntity.badRequest().body("Given username or password is incorrect");
    }

    public ResponseEntity<String> userExistsHandling() {
        return ResponseEntity.badRequest().body("Given username is already taken");
    }

    public ResponseEntity<String> getUsernameByUuid(String uuid) {
        return ResponseEntity.ok(authUserRepository.findById(uuid)
                .orElseThrow(NoSuchUserException::new)
                .getUsername()
        );
    }
}
