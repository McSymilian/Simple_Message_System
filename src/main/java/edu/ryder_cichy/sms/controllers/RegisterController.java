package edu.ryder_cichy.sms.controllers;

import edu.ryder_cichy.sms.user.AuthUser;
import edu.ryder_cichy.sms.user.AuthUserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class RegisterController {
    private final PasswordEncoder passwordEncoder;
    private final AuthUserRepository authUserRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthUser authUser){
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
}