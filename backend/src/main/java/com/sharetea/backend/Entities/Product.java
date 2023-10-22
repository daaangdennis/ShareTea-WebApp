package com.sharetea.backend.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table (name = "product")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer product_id;

    @NotEmpty private String name;

    @NotEmpty private Double price;

    @NotEmpty private String category;


    
    public Integer getProduct_id() {
        return product_id;
    }

    public String getName() {
        return name;
    }

    public Double getPrice() {
        return price;
    }

    public String getCategory() {
        return category;
    }

    @Override
    public String toString() {
        return "Product [product_id=" + product_id + ", name=" + name + ", price=" + price + ", category=" + category
                + "]";
    }

    
}
