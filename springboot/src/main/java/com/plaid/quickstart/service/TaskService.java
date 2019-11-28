package com.plaid.quickstart.service;

import com.plaid.quickstart.exception.ResourceNotFoundException;
import com.plaid.quickstart.model.Task;
import com.plaid.quickstart.model.User;
import com.plaid.quickstart.repository.TaskRepository;
import com.plaid.quickstart.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks(String username){
        List<Task> taskList=null;
        User user = userRepository.findByUsername(username);
        if(user!=null){
            taskList = taskRepository.findByUser_id(user.getId());
        }

        return taskList;

    }


    public Task save(Task task, String username) throws ResourceNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user!=null){
            task.setUser(user);
        }
        else{
            throw new ResourceNotFoundException("User","username","Not found");
        }
        return taskRepository.save(task);
    }


    public Task updateTaskById(Integer id, Integer actual){
        Task task = null;
        task = taskRepository.findByTaskId(id);
        if(task!=null){
            task.setHoursActual(actual);
        }
        else{
            throw new ResourceNotFoundException("Task","id","Not found");
        }

        return taskRepository.save(task);
    }
}
