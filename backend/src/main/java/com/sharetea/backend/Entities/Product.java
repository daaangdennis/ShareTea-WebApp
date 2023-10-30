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

    public String getUrl() {
        return url;
    }

    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setUrl(String url) {
        this.url = url;
    }


    @Override
    public String toString() {
        return "Product [product_id=" + product_id + ", name=" + name + ", price=" + price + ", category=" + category
                + ", url=" + url + "]";
    }
    

    
}
