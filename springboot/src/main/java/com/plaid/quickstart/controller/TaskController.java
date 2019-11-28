package com.plaid.quickstart.controller;


import com.plaid.quickstart.model.Task;
import com.plaid.quickstart.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping(path = "/all/{username}")
    public ResponseEntity<?> getAllTasks(@RequestParam("username") String username){
                return ResponseEntity.ok(taskService.getAllTasks(username));
    }

    @PostMapping(path = "/addTask/{username}")
    public ResponseEntity<?> addTasks(@RequestBody Task task, @RequestParam("username") String username){
        System.out.println(username);
        return ResponseEntity.ok(taskService.save(task,username));
    }

    @PostMapping(path = "/addTask/{id}/{actual}")
    public ResponseEntity<?> updateTaskById( @RequestParam("id") Integer id, @RequestParam("actual") Integer actual){
        return ResponseEntity.ok(taskService.updateTaskById(id,actual));
    }


}
