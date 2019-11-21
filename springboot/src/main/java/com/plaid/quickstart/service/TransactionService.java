package com.plaid.quickstart.service;

import com.plaid.quickstart.model.Transaction;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.RollbackException;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;


    public Transaction save(Transaction transaction, User user, Integer vpaIndicator) throws RollbackException {
        try{

                transaction.setUser(user);
                transaction.setIsManuallyInserted(vpaIndicator);
                if(transaction.getTransactionDate()!=null)
                {
                    String[] x = transaction.getTransactionDate().split("/");
                    if(x.length>2) {
                        String day = x[1];
                        String month = x[0];
                        String year = x[2];

                        transaction.setDay(Integer.parseInt(day));
                        transaction.setMonth(Integer.parseInt(month));
                        transaction.setYear(Integer.parseInt(year));

                        Integer quarter = 0;
                        if(Integer.parseInt(month)<4)
                            quarter = 1;
                        else if(Integer.parseInt(month)>3 && Integer.parseInt(month)<7)
                            quarter = 2;
                        else if(Integer.parseInt(month)>6 && Integer.parseInt(month)<10)
                            quarter = 3;
                        else
                            quarter = 4;

                        transaction.setQuarter(quarter);
                    }
                }

            return transactionRepository.save(transaction);
        }
        catch (Exception e){
            throw e;
        }

    }
}
