package com.sharetea.backend.Entities;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table (name = "employee")
public class Employee {

    @Id private Integer user_id;

    @NotEmpty private String position;

    private String phone_number;

    @CreationTimestamp @JsonFormat(pattern = "yyyy-MM-dd")
    private Date hire_date;


    public Integer getUser_id() {
        return user_id;
    }

    public String getPosition() {
        return position;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public Date getHire_date() {
        return hire_date;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public void setHire_date(Date hire_date) {
        this.hire_date = hire_date;
    }

}
