package com.plaid.quickstart.controller;

import com.plaid.quickstart.exception.ResourceNotFoundException;
import com.plaid.quickstart.model.Transaction;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.TransactionRepository;
import com.plaid.quickstart.repository.UserRepository;
import com.plaid.quickstart.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.RollbackException;
import java.io.IOException;

@RestController
@RequestMapping("/expense")
public class ExpenseController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private TransactionService transactionService;

    @PostMapping(path = "/{username}/{vpaIndicator}")
    public ResponseEntity<?> addExpense(@PathVariable("username") String username,@PathVariable("vpaIndicator") Integer vpaIndicator,
                                        @RequestBody Transaction transaction) throws RollbackException, ResourceNotFoundException, IOException {
        System.out.println(username);
        System.out.println("Amount:::"+transaction.getAmount());
        User user = userRepository.findByUsername(username);
        if(user!=null) {
            transactionService.save(transaction,user,vpaIndicator);
        }
        else
            throw new ResourceNotFoundException("User","not","found");
        return ResponseEntity.ok(transactionRepository.save(transaction));
    }
}
