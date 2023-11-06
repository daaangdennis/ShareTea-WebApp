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

    
    public Integer getOrder_product_id() {
        return order_product_id;
    }

    public Integer getProduct_id() {
        return product_id;
    }

    public Integer getOrder_id() {
        return order_id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getNote() {
        return note;
    }

    

    @Override
    public String toString() {
        return "OrderProduct [order_product_id=" + order_product_id + ", product_id=" + product_id + ", order_id="
                + order_id + ", quantity=" + quantity + ", note=" + note + "]";
    }

    public void setOrder_product_id(Integer order_product_id) {
        this.order_product_id = order_product_id;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    public void setOrder_id(Integer order_id) {
        this.order_id = order_id;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setNote(String note) {
        this.note = note;
    }

    
}
