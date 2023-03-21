package com.backend.redflagbackend.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class testRest {

    @GetMapping("test")
    public List<String> test() {
        return List.of("a", "asdoc");
    }
}
