package com.plaid.quickstart.controller;

import com.plaid.quickstart.exception.ResourceNotFoundException;
import com.plaid.quickstart.model.Transaction;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.UserRepository;
import com.plaid.quickstart.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.RollbackException;
import java.io.IOException;

@RestController
@RequestMapping("/addTransaction")
public class IncomeAndBudgetController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionService transactionService;


    @PostMapping(path = "/{username}/{incomeBudgetIndicator}/{dayOrMonth}")
    public ResponseEntity<?> addIncomeAndBudget(@PathVariable("username") String username,
                                                @PathVariable("incomeBudgetIndicator") String incomeBudgetIndicator,
                                                @PathVariable("dayOrMonth") String dayOrMonth,
                                                @RequestParam Double amount,
                                                @RequestParam Integer day,
                                                @RequestParam Integer month,
                                                @RequestParam Integer quarter,
                                                @RequestParam Integer year)
            throws RollbackException, ResourceNotFoundException, IOException {
        User user = userRepository.findByUsername(username);
        Transaction transaction = new Transaction();
        if(user!=null)
        {
            transaction = transactionService.addIncomeAndBudget(transaction,user,1,
                    incomeBudgetIndicator,dayOrMonth,amount,day,month,quarter,year);

        }

        return ResponseEntity.ok(transaction);


    }


}
