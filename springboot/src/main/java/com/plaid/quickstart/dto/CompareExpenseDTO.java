package com.plaid.quickstart.dto;

import java.io.Serializable;

public class CompareExpenseDTO implements Serializable {

    private String month;
    private Integer year1;
    private Integer year2;

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Integer getYear1() {
        return year1;
    }

    public void setYear1(Integer year1) {
        this.year1 = year1;
    }

    public Integer getYear2() {
        return year2;
    }

    public void setYear2(Integer year2) {
        this.year2 = year2;
    }
}
