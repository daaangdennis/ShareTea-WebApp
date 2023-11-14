package com.sharetea.backend.Entities;

import java.time.LocalDate;

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
    private LocalDate last_updated;

    private Boolean is_topping;


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

    public LocalDate getLast_updated() {
        return last_updated;
    }

    public Boolean getIs_topping() {
        return is_topping;
    }


    public void setInventory_id(Integer inventory_id) {
        this.inventory_id = inventory_id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setLast_updated(LocalDate last_updated) {
        this.last_updated = last_updated;
    }

    public void setIs_topping(Boolean is_topping) {
        this.is_topping = is_topping;
    } 
    
    
    @Override
    public String toString() {
        return "Inventory [inventory_id=" + inventory_id + ", name=" + name + ", details=" + details + ", quantity="
                + quantity + ", last_updated=" + last_updated + ", is_topping=" + is_topping + "]";
    }
    
}
