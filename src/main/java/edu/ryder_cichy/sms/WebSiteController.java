package edu.ryder_cichy.sms;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebSiteController {
    @GetMapping("home")
    public String home() {
        return "index";
    }

    @GetMapping("dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @GetMapping("404")
    public String notFound404() {
        return "404";
    }
}
