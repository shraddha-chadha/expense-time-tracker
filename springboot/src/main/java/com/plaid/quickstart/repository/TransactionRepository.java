package com.plaid.quickstart.repository;

import com.plaid.quickstart.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    List<Transaction> findByMonthAndYearAndUser_id(Integer month, Integer year, Integer user_id);

    List<Transaction> findByQuarterAndYearAndUser_id(Integer quarter, Integer year, Integer user_id);

    List<Transaction> findByYearAndUser_id(Integer year, Integer user_id);

}
