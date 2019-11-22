package com.plaid.quickstart.dto;

import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class CompareExpenseDTO implements Serializable {

    private String month;
    private Double year1;
    private Double year2;

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Double getYear1() {
        return year1;
    }

    public void setYear1(Double year1) {
        this.year1 = year1;
    }

    public Double getYear2() {
        return year2;
    }

    public void setYear2(Double year2) {
        this.year2 = year2;
    }
}
