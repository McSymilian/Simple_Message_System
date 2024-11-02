package edu.ryder_cichy.sms.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("signIn")
    public ResponseEntity<String> signIn(@RequestBody UserDAO user) {
        return userService.login(user.getUsername(), user.getPassword());
    }

    @PostMapping("signUp")
    public ResponseEntity<String> signUp(@RequestBody UserDAO user) {
        return userService.register(user.getUsername(), user.getPassword());
    }

    @ExceptionHandler(NoSuchUserException.class)
    public ResponseEntity<String> noSuchUserExceptionHandling(NoSuchUserException e) {
        return userService.noSuchUserHandling();
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<String> userExistsExceptionHandling(UserExistsException e) {
        return userService.userExistsHandling();
    }


}
