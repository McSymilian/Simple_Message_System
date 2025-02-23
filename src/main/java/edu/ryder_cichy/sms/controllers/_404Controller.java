package edu.ryder_cichy.sms.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class _404Controller {
    @GetMapping("/404")
    public String _404() {
        return "404";
    }
}
