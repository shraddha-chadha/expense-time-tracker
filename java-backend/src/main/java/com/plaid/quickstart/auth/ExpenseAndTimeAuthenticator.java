package com.plaid.quickstart.auth;

import com.plaid.quickstart.core.User;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentials;


import java.util.Optional;

public class ExpenseAndTimeAuthenticator implements Authenticator<BasicCredentials, User> {


    @Override
    public Optional<User> authenticate(BasicCredentials basicCredentials) throws AuthenticationException {
        if(basicCredentials.getUsername().equals("admin") &&
                basicCredentials.getPassword().equalsIgnoreCase("1234") )
        {
            return Optional.of(new User(basicCredentials.getUsername()));
        }

        return Optional.empty();
    }
}
