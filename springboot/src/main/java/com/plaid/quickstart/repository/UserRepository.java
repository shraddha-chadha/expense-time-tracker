package com.plaid.quickstart.repository;

import com.plaid.quickstart.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface UserRepository extends JpaRepository<User,Long> {

    User findByUsernameAndPassword(String username, String password);
    User findByUsername(String username);
    User findByAmazonId(String amazonId);
    User findByGoogleId(String googleId);
}
