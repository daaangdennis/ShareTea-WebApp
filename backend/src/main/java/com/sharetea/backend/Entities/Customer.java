package com.sharetea.backend.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name = "customer")
public class Customer {

    @Id private Integer user_id;

    private String phone_number;
    private Integer order_count = 1;

    public Integer getUser_id() {
        return user_id;
    }

    public String getPhone_number() {
        return phone_number;
    }

    public Integer getOrder_count() {
        return order_count;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    public void setPhone_number(String phone_number) {
        this.phone_number = phone_number;
    }

    public void setOrder_count(Integer order_count) {
        this.order_count = order_count;
    }
    
}
