package edu.ryder_cichy.sms;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/debug")
public class DebugController {
    @GetMapping("/session")
    public String checkSession(Principal principal) {
        return principal != null ? "Logged in as: " + principal.getName() : "Not authenticated";
    }
}
