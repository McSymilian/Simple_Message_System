package edu.ryder_cichy.sms.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class UserController {
    private final UserDetailsService userDetailsService;

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
