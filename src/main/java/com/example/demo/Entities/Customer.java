package com.example.demo.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table (name = "customer")
public class Customer {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer customer_id;

    @NotEmpty private String first_name;

    @NotEmpty private String last_name;

    private String email;
    private String phone_number;
    private Integer order_count = 1;


    public int getCustomer_id() {
        return customer_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public String getLast_name() {
        return last_name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public int getOrder_count() {
        return order_count;
    }

    @Override
    public String toString() {
        return "customer [customer_id=" + customer_id + ", first_name=" + first_name + ", last_name=" + last_name
                + ", email=" + email + ", phone_number=" + phone_number + ", order_count=" + order_count + "]";
    }
    
    

}
