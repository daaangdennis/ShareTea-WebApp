package com.sharetea.backend.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name = "item_toppings")
public class ItemToppings {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer item_toppings_id;

    @NotNull private Integer order_product_id;

    @NotNull private Integer inventory_id;

    public Integer getItem_toppings_id() {
        return item_toppings_id;
    }

    public Integer getOrder_product_id() {
        return order_product_id;
    }

    public Integer getInventory_id() {
        return inventory_id;
    }

    public void setItem_toppings_id(Integer item_toppings_id) {
        this.item_toppings_id = item_toppings_id;
    }

    public void setOrder_product_id(Integer order_product_id) {
        this.order_product_id = order_product_id;
    }

    public void setInventory_id(Integer inventory_id) {
        this.inventory_id = inventory_id;
    }


    @Override
    public String toString() {
        return "ItemToppings [item_toppings_id=" + item_toppings_id + ", order_product_id=" + order_product_id
                + ", inventory_id=" + inventory_id + "]";
    }

}
