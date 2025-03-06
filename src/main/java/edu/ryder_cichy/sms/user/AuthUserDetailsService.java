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
import java.util.regex.Pattern;

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
        if (!validateLogin(authUser.getUsername())) {
            throw new InvalidCredentialsException();
        }
        if (!validatePassword(authUser.getPassword())) {
            throw new InvalidCredentialsException();
        }


        authUserRepository.findByUsername(authUser.getUsername())
                .ifPresent(user -> { throw new UserExistsException(); });

        authUser.setPassword(passwordEncoder.encode(authUser.getPassword()));
        authUserRepository.save(authUser);

        return ResponseEntity.ok(HttpServletResponse.SC_CREATED);
    }

    private boolean validateLogin(String login) {
        String loginRegex = "^[^\\s@]{3,20}$";
        return Pattern.matches(loginRegex, login);
    }

    private boolean validatePassword(String password) {
        String passwordRegex = "^\\S{6,20}$";
        return Pattern.matches(passwordRegex, password);
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

    public ResponseEntity<String> invalidCredentialsHandling() {
        return ResponseEntity.badRequest().body(
                "Username must be between 3 and 20 characters long and cannot contain spaces or @\n" +
                "Password must be between 6 and 20 characters long and cannot contain spaces"
        );
    }
}
