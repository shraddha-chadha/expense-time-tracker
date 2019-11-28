package com.plaid.quickstart.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.io.Serializable;

@Data
@EntityListeners(AuditingEntityListener.class)
@Entity
public class Task implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer taskId;

    private String taskName;

    private String taskDate;

    private Integer hoursEstimate;

    private Integer hoursActual;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private User user;

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getTaskDate() {
        return taskDate;
    }

    public void setTaskDate(String taskDate) {
        this.taskDate = taskDate;
    }

    public Integer getHoursEstimate() {
        return hoursEstimate;
    }

    public void setHoursEstimate(Integer hoursEstimate) {
        this.hoursEstimate = hoursEstimate;
    }

    public Integer getHoursActual() {
        return hoursActual;
    }

    public void setHoursActual(Integer hoursActual) {
        this.hoursActual = hoursActual;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
