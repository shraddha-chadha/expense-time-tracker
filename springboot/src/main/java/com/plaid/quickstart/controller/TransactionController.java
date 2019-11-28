package com.plaid.quickstart.controller;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.TransactionsGetRequest;
import com.plaid.client.response.ErrorResponse;
import com.plaid.client.response.TransactionsGetResponse;
import com.plaid.quickstart.QuickstartApplication;
import com.plaid.quickstart.model.Transaction;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.UserRepository;
import com.plaid.quickstart.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import retrofit2.Response;

import java.io.IOException;
import java.util.Date;

@RestController
public class TransactionController {

    private PlaidClient plaidClient;
    @Autowired
    private TransactionService transactionService;
    @Autowired
    private UserRepository userRepository;


    @PostMapping("/transactions/{username}")
    public TransactionsGetResponse getTransactions(@PathVariable("username") String username) throws IOException {
        User user = userRepository.findByUsername(username);
        if(user!=null)
        {
            transactionService.getPlaidTransactions(user,0);
        }
        plaidClient = QuickstartApplication.plaidClient;
        String accessToken = QuickstartApplication.accessToken;
        Date startDate = new Date(System.currentTimeMillis() - 86400000L * 100);
        Date endDate = new Date();

        TransactionsGetRequest request =
                new TransactionsGetRequest(user.getAccesstoken(), startDate, endDate)
                        .withCount(100);

        Response<TransactionsGetResponse> response = null;
        for (int i = 0; i < 5; i++) {
            response = plaidClient.service().transactionsGet(request).execute();
            if (response.isSuccessful()) {
                break;
            } else {
                try {
                    ErrorResponse errorResponse = plaidClient.parseError(response);
                    Thread.sleep(3000);
                } catch(InterruptedException e) {
                    e.printStackTrace();
                    // catch error
                }
            }
        }

        return response.body();
    }
}
