package com.sharetea.backend.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name = "order_product")
public class OrderProduct {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer order_product_id;

    @NotNull private Integer product_id;

    @NotNull private Integer order_id;
    
    @NotNull private Integer quantity;

    private String note;

    private String toppings;
}
