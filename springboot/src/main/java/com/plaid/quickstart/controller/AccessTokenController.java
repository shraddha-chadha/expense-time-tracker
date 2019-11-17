package com.plaid.quickstart.controller;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.ItemPublicTokenExchangeRequest;
import com.plaid.client.response.ItemPublicTokenExchangeResponse;
import com.plaid.quickstart.QuickstartApplication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import retrofit2.Response;

import java.io.IOException;

@RestController
public class AccessTokenController {

private PlaidClient plaidClient;

    @PostMapping("/get_access_token")
    public ItemPublicTokenExchangeResponse getAccessToken(@PathVariable("public_token") String publicToken) throws IOException {
        plaidClient = QuickstartApplication.plaidClient;
        Response<ItemPublicTokenExchangeResponse> itemResponse = plaidClient.service()
                .itemPublicTokenExchange(new ItemPublicTokenExchangeRequest(publicToken))
                .execute();

        // Ideally, we would store this somewhere more persistent
        QuickstartApplication.accessToken = itemResponse.body().getAccessToken();

        System.out.println("public token: " + publicToken);
        System.out.println("access token: " + QuickstartApplication.accessToken);
        System.out.println("item ID: " + itemResponse.body().getItemId());

        System.out.println(itemResponse.body().toString());

        return itemResponse.body();
    }
}