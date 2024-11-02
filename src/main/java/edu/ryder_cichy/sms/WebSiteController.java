package edu.ryder_cichy.sms;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebSiteController {
    @GetMapping("home")
    public String home() {
        return "index";
    }
}
