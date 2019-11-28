package com.plaid.quickstart.repository;

import com.plaid.quickstart.model.Task;
import com.plaid.quickstart.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task,Long> {

    List<Task> findByUser_id(Integer id);

    Task findByTaskId(Integer id);
}
