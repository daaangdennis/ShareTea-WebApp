package com.sharetea.backend.Entities;


import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name = "orders")
public class Orders {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer order_id;

    @NotNull private Integer customer_id;

    @NotNull private Integer employee_id;

    @CreationTimestamp @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime order_date;
    
    @NotNull private Double total;

    private Boolean is_pending = true;

    private Boolean is_refunded = false;



    public Integer getOrder_id() {
        return order_id;
    }

    public Integer getCustomer_id() {
        return customer_id;
    }

    public Integer getEmployee_id() {
        return employee_id;
    }

    public LocalDateTime getOrder_date() {
        return order_date;
    }

    public Double getTotal() {
        return total;
    }

    public Boolean getIs_pending() {
        return is_pending;
    }

    public Boolean getIs_refunded() {
        return is_refunded;
    }

    @Override
    public String toString() {
        return "Orders [order_id=" + order_id + ", customer_id=" + customer_id + ", employee_id=" + employee_id
                + ", order_date=" + order_date + ", total=" + total + ", is_pending=" + is_pending + ", is_refunded="
                + is_refunded + "]";
    }
}
