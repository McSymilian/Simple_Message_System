package edu.ryder_cichy.sms.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class UserController {
    private final UserDetailsService userDetailsService;

    @PostMapping("signIn")
    public ResponseEntity<String> signIn(@RequestBody UserDAO user) {
        System.out.println("Login attempt for" + user.toString());
        return userDetailsService.login(user.getUsername(), user.getPassword());
    }

    @PostMapping("signUp")
    public ResponseEntity<String> signUp(@RequestBody UserDAO user) {
        System.out.println("Register attempt for" + user.toString());
        return userDetailsService.register(user.getUsername(), user.getPassword());
    }

    @ExceptionHandler(NoSuchUserException.class)
    public ResponseEntity<String> noSuchUserExceptionHandling(NoSuchUserException e) {
        return userDetailsService.noSuchUserHandling();
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<String> userExistsExceptionHandling(UserExistsException e) {
        return userDetailsService.userExistsHandling();
    }

    @GetMapping("getUsername")
    public ResponseEntity<String> getUsername(@RequestParam String uuid) {
        return userDetailsService.getUsernameByUuid(uuid);
    }
}
