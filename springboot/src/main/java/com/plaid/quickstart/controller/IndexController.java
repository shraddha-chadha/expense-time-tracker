package com.plaid.quickstart.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/")
public class IndexController {

    @Value("${environment}")
    private String plaidEnvironment;
    @Value("${plaidPublicKey}")
    private String plaidPublicKey;

    @GetMapping("/index")
    public String index(Model model) {
        model.addAttribute("plaidEnvironment", plaidEnvironment);
        model.addAttribute("plaidPublicKey", plaidPublicKey);
        return "index";
    }




}
