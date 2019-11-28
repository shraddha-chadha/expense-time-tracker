package com.plaid.quickstart.controller;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.ItemPublicTokenExchangeRequest;
import com.plaid.client.response.ItemPublicTokenExchangeResponse;
import com.plaid.quickstart.QuickstartApplication;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import retrofit2.Response;

import java.io.IOException;

@RestController
public class AccessTokenController {

    @Autowired
    private UserRepository userRepository;

private PlaidClient plaidClient;
    @PostMapping("/get_access_token")
    public ItemPublicTokenExchangeResponse getAccessToken(@RequestParam("public_token") String publicToken, @RequestParam("username") String username) throws IOException {
        plaidClient = QuickstartApplication.plaidClient;
        Response<ItemPublicTokenExchangeResponse> itemResponse = plaidClient.service()
                .itemPublicTokenExchange(new ItemPublicTokenExchangeRequest(publicToken))
                .execute();

        System.out.println("username::"+username);
        // Ideally, we would store this somewhere more persistent
        User user = userRepository.findByUsername(username);
        user.setAccesstoken(itemResponse.body().getAccessToken());
        user = userRepository.save(user);
        System.out.println("access Token db::"+user.getAccesstoken());
        QuickstartApplication.accessToken = itemResponse.body().getAccessToken(); // {username: accesstoken}

        System.out.println("public token: " + publicToken);
        System.out.println("access token: " + QuickstartApplication.accessToken);
        System.out.println("item ID: " + itemResponse.body().getItemId());

        System.out.println(itemResponse.body().toString());

        return itemResponse.body();
    }
}
