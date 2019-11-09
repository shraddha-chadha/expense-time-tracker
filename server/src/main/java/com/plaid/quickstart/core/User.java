package com.plaid.quickstart.core;

import java.security.Principal;
import java.util.Set;

public class User implements Principal {

    private String userName;


    public User(String userName) {
        this.userName = userName;
    }



    @Override
    public String getName() {
            return userName;
    }

}
