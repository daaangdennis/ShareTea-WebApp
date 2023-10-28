package com.sharetea.backend.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name = "inventory_product")
public class InventoryProduct {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer inventory_product_id;

    @NotNull private Integer product_id;

    @NotNull private Integer inventory_id;
    
    private Integer quantity = 1;

    public Integer getInventory_product_id() {
        return inventory_product_id;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public Integer getInventory_id() {
        return inventory_id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    @Override
    public String toString() {
        return "InventoryProduct [inventory_product_id=" + inventory_product_id + ", product_id=" + product_id
                + ", inventory_id=" + inventory_id + ", quantity=" + quantity + "]";
    }

    
}
