package com.plaid.quickstart.controller;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.AccountsBalanceGetRequest;
import com.plaid.client.request.ItemPublicTokenExchangeRequest;
import com.plaid.client.response.Account;
import com.plaid.client.response.AccountsBalanceGetResponse;
import com.plaid.quickstart.QuickstartApplication;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import retrofit2.Response;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class BalanceController {
    @Autowired
    private UserRepository userRepository;

    private PlaidClient plaidClient;

    @PostMapping("/get_balance")
    public AccountsBalanceGetResponse getBalance(@RequestParam("username") String username) throws IOException {

        plaidClient = QuickstartApplication.plaidClient;
        User user = userRepository.findByUsername(username);
        String accessToken = user.getAccesstoken(); //Getting null here
        Response<AccountsBalanceGetResponse> accountBalanceResponse = plaidClient.service()
                .accountsBalanceGet(new AccountsBalanceGetRequest(accessToken)).execute();
        List<Account> accounts = new ArrayList<>();
        Double balance = 12.0;
        // if(accountBalanceResponse!=null && accountBalanceResponse.body()!=null)
        // {
        //     accounts = accountBalanceResponse.body().getAccounts();
        //     // balance = accounts.get(0).getBalances().getAvailable();

        // }
        // return balance;

        return accountBalanceResponse.body();
    }
}
