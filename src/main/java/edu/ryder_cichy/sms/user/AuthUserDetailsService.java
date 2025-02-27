package edu.ryder_cichy.sms.user;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
@AllArgsConstructor
public class AuthUserDetailsService implements UserDetailsService {
    private final AuthUserRepository authUserRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) {
        AuthUser authUser = authUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return User
                .withUsername(authUser.getUsername())
                .password(authUser.getPassword())
                .roles("USER")
                .build();
    }

    public ResponseEntity<?> registerUser(AuthUser authUser) {
        authUserRepository.findByUsername(authUser.getUsername())
                .ifPresent(user -> { throw new UserExistsException(); });

        authUser.setPassword(passwordEncoder.encode(authUser.getPassword()));
        authUserRepository.save(authUser);

        return ResponseEntity.ok(HttpServletResponse.SC_CREATED);
    }

    public ResponseEntity<String> getUsernameByPrincipal(Principal principal) {
        return ResponseEntity.ok(principal.getName());
    }

    public ResponseEntity<String> noSuchUserHandling() {
        return ResponseEntity.badRequest().body("Given username or password is incorrect");
    }

    public ResponseEntity<String> userExistsHandling() {
        return ResponseEntity.badRequest().body("Given username is already taken");
    }
}
