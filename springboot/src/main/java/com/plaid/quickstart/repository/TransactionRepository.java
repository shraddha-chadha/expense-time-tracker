package com.plaid.quickstart.repository;

import com.plaid.quickstart.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface TransactionRepository extends JpaRepository<Transaction,Long> {


}
