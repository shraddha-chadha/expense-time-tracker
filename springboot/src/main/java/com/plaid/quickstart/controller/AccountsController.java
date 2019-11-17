package com.plaid.quickstart.controller;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.AccountsGetRequest;
import com.plaid.client.response.AccountsGetResponse;
import com.plaid.quickstart.QuickstartApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import retrofit2.Response;

import java.io.IOException;

@RestController
public class AccountsController {

    private PlaidClient plaidClient;

    @GetMapping("/accounts")
    public AccountsGetResponse getAccounts() throws IOException {
        plaidClient = QuickstartApplication.plaidClient;
        Response<AccountsGetResponse> accountsResponse = plaidClient.service()
                .accountsGet(new AccountsGetRequest(QuickstartApplication.accessToken))
                .execute();
        System.out.println(accountsResponse.body().toString());
        return accountsResponse.body();
    }


}
