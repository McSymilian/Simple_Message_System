package edu.ryder_cichy.sms.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class AuthUserController {
    private final AuthUserDetailsService authUserDetailsService;

    @ExceptionHandler(NoSuchUserException.class)
    public ResponseEntity<String> noSuchUserExceptionHandling(NoSuchUserException e) {
        return authUserDetailsService.noSuchUserHandling();
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<String> userExistsExceptionHandling(UserExistsException e) {
        return authUserDetailsService.userExistsHandling();
    }

    @GetMapping("getUsername")
    public ResponseEntity<String> getUsername(@RequestParam String uuid) {
        return authUserDetailsService.getUsernameByUuid(uuid);
    }
}
