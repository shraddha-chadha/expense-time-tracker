package com.plaid.quickstart.controller;

import com.plaid.quickstart.exception.RegistrationFailedException;
import com.plaid.quickstart.exception.ResourceNotFoundException;
import com.plaid.quickstart.model.JwtRequest;
import com.plaid.quickstart.model.JwtResponse;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.UserRepository;
import com.plaid.quickstart.service.JwtUserDetailsService;
import com.plaid.quickstart.service.TransactionService;
import com.plaid.quickstart.util.JwtTokenUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import retrofit2.http.Path;

import javax.transaction.RollbackException;
import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
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

    @Autowired
    private PasswordEncoder bcryptEncoder;


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

    /*@RequestMapping(value = "/authenticateVpa", method = RequestMethod.POST)
    public ResponseEntity<?> createVpaAuthenticationToken(@RequestParam String vpaIndicator,
                                                          @RequestParam String token) throws Exception {
        User user = null;
        if(vpaIndicator.equalsIgnoreCase("Amazon"))
             user = userRepository.findByAmazonId(token);
        else if(vpaIndicator.equalsIgnoreCase("Google"))
            user = userRepository.findByGoogleId(token);
        if(user!=null) {
           // authenticate(user.getUsername(), user.getPassword());

            final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

            final String JwtToken = jwtTokenUtil.generateToken(userDetails);

            return ResponseEntity.ok(new JwtResponse(JwtToken, userDetails.getUsername()));
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }*/

    @RequestMapping(value = "/authenticateVpa", method = RequestMethod.POST)
    public ResponseEntity<?> createVpaAuthenticationToken(@RequestParam String username) throws Exception {
        User user = null;
        user = userRepository.findByUsername(username);
        if(user!=null) {
            // authenticate(user.getUsername(), user.getPassword());

            final UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

            final String JwtToken = jwtTokenUtil.generateToken(userDetails);

            return ResponseEntity.ok(new JwtResponse(JwtToken, userDetails.getUsername()));
        }
        else{
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
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

    @PostMapping(path = "/token/{username}/{tokenIdentifier}/{tokenValue}")
    public ResponseEntity<?> storeAccessToken(@PathVariable("username") String username,
                                              @PathVariable("tokenIdentifier") String tokenIdentifier,
                                              @PathVariable("tokenValue") String tokenValue)
            throws RollbackException, ResourceNotFoundException {

        User user = userRepository.findByUsername(username);
        if(tokenIdentifier.equalsIgnoreCase("amazon")){
            user.setAmazonId(tokenValue);
        }
        else if(tokenIdentifier.equalsIgnoreCase("google"))
        {
            user.setGoogleId(tokenValue);
        }

        user = userRepository.save(user);
        if(user!=null)
            return ResponseEntity.ok("Succesfully inserted in to database");

        return ResponseEntity.ok("User not found");


    }


    @PostMapping(path = "/getToken/{username}")
    public ResponseEntity<?> getApiToken(@PathVariable("username") String username){

        User user = userRepository.findByUsername(username);
        if(user!=null)
            return ResponseEntity.ok(user);

        return ResponseEntity.ok("User not found");
    }
    //Update a User


    //Delete a User
}
