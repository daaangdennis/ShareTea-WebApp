package com.sharetea.backend.Entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name = "product")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer product_id;

    @Column (unique = true) @NotEmpty private String name;

    @NotNull private Double price;

    @NotEmpty private String category;

    private String url;
    private Boolean has_ice;
    private Boolean has_toppings;
    private Boolean has_sugar;



    public Integer getProduct_id() {
        return product_id;
    }
    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
    public Boolean getHas_ice() {
        return has_ice;
    }
    public void setHas_ice(Boolean has_ice) {
        this.has_ice = has_ice;
    }
    public Boolean getHas_sugar() {
        return has_sugar;
    }
    public void setHas_sugar(Boolean has_sugar) {
        this.has_sugar = has_sugar;
    }
    public Boolean getHas_toppings() {
        return has_toppings;
    }
    public void setHas_toppings(Boolean has_toppings) {
        this.has_toppings = has_toppings;
    }

    
    
}
