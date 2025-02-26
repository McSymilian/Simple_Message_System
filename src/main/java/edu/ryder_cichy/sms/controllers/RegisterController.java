package edu.ryder_cichy.sms.controllers;

import edu.ryder_cichy.sms.user.User;
import edu.ryder_cichy.sms.user.UserRepository;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class RegisterController {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity registerUser(@RequestBody User user){
        try {
            if (userRepository.findByUsername(user.getUsername()).isPresent())
                return ResponseEntity
                        .status(HttpServletResponse.SC_CONFLICT)
                        .body("Username already taken. Please try again");

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            userRepository.save(user);

            return ResponseEntity.ok(HttpStatus.CREATED);

        } catch (Exception e){
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}