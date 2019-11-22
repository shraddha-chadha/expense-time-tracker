package com.plaid.quickstart.controller;

import com.plaid.quickstart.dto.CompareExpenseDTO;
import com.plaid.quickstart.exception.ResourceNotFoundException;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.UserRepository;
import com.plaid.quickstart.service.TransactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.RollbackException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/metrics")
public class TransactionMetricsController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserRepository userRepository;


    @PostMapping(path = "/all/{username}/{filterType}/{month}/{quarter}/{year}")
    public ResponseEntity<?> getAllTotalsByFilter(@PathVariable("username") String username,
                                                  @PathVariable("filterType") String filterType,
                                                  @PathVariable("month") Integer month,
                                                  @PathVariable("quarter") Integer quarter,
                                                  @PathVariable("year") Integer year) throws RollbackException, ResourceNotFoundException {

        User user = userRepository.findByUsername(username);
        Map<String,Double> map = null;
        if (user!=null)
        {
             map = transactionService.getAllTotalsByFilter(user.getId(),filterType,month,quarter,year);
        }
        else
        {
            throw new ResourceNotFoundException("User","username","user_id");
        }
            return ResponseEntity.ok(map);



    }


    @PostMapping(path = "/expensesByCategory/{username}/{filterType}/{month}/{quarter}/{year}")
    public ResponseEntity<?> getExpensesByCategory(@PathVariable("username") String username,
                                                  @PathVariable("filterType") String filterType,
                                                  @PathVariable("month") Integer month,
                                                  @PathVariable("quarter") Integer quarter,
                                                  @PathVariable("year") Integer year) throws RollbackException, ResourceNotFoundException {

        User user = userRepository.findByUsername(username);
        Map<String,Double> map = null;
        if (user!=null)
        {
            map = transactionService.getAllTotalsByFilter(user.getId(),filterType,month,quarter,year);
        }
        else
        {
            throw new ResourceNotFoundException("User","username","user_id");
        }
        return ResponseEntity.ok(map);



    }


    @PostMapping(path = "/compareExpense/{username}/{year1}{year2}")
    public ResponseEntity<?> compareYearlyExpensesByMonth(@PathVariable("username") String username,
                                                   @PathVariable("year1") Integer year1,
                                                   @PathVariable("year2") Integer year2) throws RollbackException, ResourceNotFoundException {

        User user = userRepository.findByUsername(username);
        List<CompareExpenseDTO> map = null;
        if (user!=null)
        {
            map = transactionService.compareYearlyExpensesByMonth(user.getId(),year1,year2);
        }
        else
        {
            throw new ResourceNotFoundException("User","username","user_id");
        }
        return ResponseEntity.ok(map);



    }

}
