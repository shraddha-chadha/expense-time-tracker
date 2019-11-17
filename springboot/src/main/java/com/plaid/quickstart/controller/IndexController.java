package com.plaid.quickstart.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;


@RestController
@RequestMapping("/")
public class IndexController {

    @Value("${environment}")
    private String plaidEnvironment;
    @Value("${plaidPublicKey}")
    private String plaidPublicKey;

    @GetMapping("/index")
    public ModelAndView index() {
        ModelAndView modelAndView = new ModelAndView("index");
        modelAndView.addObject("plaidEnvironment", plaidEnvironment);
        modelAndView.addObject("plaidPublicKey", plaidPublicKey);

        return modelAndView;
    }




}
