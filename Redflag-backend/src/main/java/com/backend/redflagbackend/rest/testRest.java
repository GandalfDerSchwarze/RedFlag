package com.backend.redflagbackend.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class testRest {

    @GetMapping("test")
    public String test() {
        return "hey";
    }
}
