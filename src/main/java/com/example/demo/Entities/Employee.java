package com.example.demo.Entities;

import java.sql.Date;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table (name = "employee")
public class Employee {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer employee_id;

    @NotEmpty private String first_name;

    @NotEmpty private String last_name;

    private String position;

    private String email;

    private String phone_number;

    @CreationTimestamp @JsonFormat(pattern = "yyyy-MM-dd")
    private Date hire_date;

    @NotEmpty private String passcode;

    public Integer getEmployee_id() {
        return employee_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getPosition() {
        return position;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public Date getHire_date() {
        return hire_date;
    }

    public String getPasscode() {
        return passcode;
    }

    @Override
    public String toString() {
        return "Employee [employee_id=" + employee_id + ", first_name=" + first_name + ", last_name=" + last_name
                + ", position=" + position + ", email=" + email + ", phone_number=" + phone_number + ", hire_date="
                + hire_date + ", passcode=" + passcode + "]";
    }






}
