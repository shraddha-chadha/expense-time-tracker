package com.plaid.quickstart.service;

import java.util.ArrayList;

import com.plaid.quickstart.exception.RegistrationFailedException;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.RollbackException;
import javax.transaction.TransactionRolledbackException;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user!=null) {
            return new org.springframework.security.core.userdetails.User(user.getUsername(),user.getPassword(),new ArrayList<>());
        } else {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
    }

    public User save(User user) throws RollbackException, RegistrationFailedException {
        User newUser = new User();
        newUser = userRepository.findByUsername(user.getUsername());
        if(newUser!=null)
            throw new RegistrationFailedException();
        else {
            newUser.setUsername(user.getUsername());
            newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
            newUser.setEmail(user.getEmail());
            newUser.setFirstName(user.getFirstName());
            newUser.setLastName(user.getLastName());
        }
        try {
            return userRepository.save(newUser);
        }
        catch (RollbackException e)
        {
            throw  e;
        }
    }

}
