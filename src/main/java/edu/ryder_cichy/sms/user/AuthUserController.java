package edu.ryder_cichy.sms.user;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@AllArgsConstructor
public class AuthUserController {
    private final AuthUserDetailsService authUserDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody AuthUser authUser){
        return authUserDetailsService.registerUser(authUser);
    }

    @GetMapping("getUsername")
    public ResponseEntity<String> getUsername(Principal principal) {
        return authUserDetailsService.getUsernameByPrincipal(principal);
    }

    @ExceptionHandler(NoSuchUserException.class)
    public ResponseEntity<String> noSuchUserExceptionHandling(NoSuchUserException e) {
        return authUserDetailsService.noSuchUserHandling();
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<String> userExistsExceptionHandling(UserExistsException e) {
        return authUserDetailsService.userExistsHandling();
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<String> invalidCredentialsExceptionHandling(InvalidCredentialsException e) {
        return authUserDetailsService.invalidCredentialsHandling();
    }
}
