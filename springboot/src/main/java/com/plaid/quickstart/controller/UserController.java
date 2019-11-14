package com.plaid.quickstart.controller;

import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    //Get all Users


    //Create New User
    @PostMapping("/register")
    public User registerUser(@Valid @RequestBody User user){
        return userRepository.save(user);
    }

    //Get user by username / email


    //Update a User


    //Delete a User
}
