package com.sharetea.backend.Entities;

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
@Table (name = "inventory")
public class Inventory {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer inventory_id;

    @NotEmpty private String name;

    private String details;

    private Integer quantity;

    @CreationTimestamp @JsonFormat(pattern = "yyyy-MM-dd")
    private Date last_updated;


    public Integer getInventory_id() {
        return inventory_id;
    }

    public String getName() {
        return name;
    }

    public String getDetails() {
        return details;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public Date getLast_updated() {
        return last_updated;
    }

    @Override
    public String toString() {
        return "Inventory [inventory_id=" + inventory_id + ", name=" + name + ", details=" + details + ", quantity="
                + quantity + ", last_updated=" + last_updated + "]";
    }

    

    
}
