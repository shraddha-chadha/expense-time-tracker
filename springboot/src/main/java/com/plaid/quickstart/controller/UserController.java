package com.plaid.quickstart.controller;

import com.plaid.quickstart.exception.RegistrationFailedException;
import com.plaid.quickstart.model.JwtRequest;
import com.plaid.quickstart.model.JwtResponse;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.UserRepository;
import com.plaid.quickstart.service.JwtUserDetailsService;
import com.plaid.quickstart.service.TransactionService;
import com.plaid.quickstart.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.transaction.RollbackException;
import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;

    @Autowired
    private TransactionService transactionService;


    //Get all Users


    //Create New User
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) throws RollbackException, RegistrationFailedException {
        return ResponseEntity.ok(userDetailsService.save(user));
    }

    //Get user by username / email
    @GetMapping("/login")
    public User login(@RequestParam String username, @RequestParam String password){
        System.out.println(username);
        System.out.println(password);

        return userRepository.findByUsernameAndPassword(username,password);
    }


    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {

        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(token,userDetails.getUsername()));
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }


    //Update a User


    //Delete a User
}
