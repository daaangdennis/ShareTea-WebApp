package com.sharetea.backend.Entities;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

@Entity
@Table (name = "user_favorite")
public class UserFavorite {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Integer user_favorite_id;

    @NotNull Integer user_id;
    @NotNull Integer product_id;

    public Integer getUser_favorite_id() {
        return user_favorite_id;
    }
    public void setUser_favorite_id(Integer user_favorite_id) {
        this.user_favorite_id = user_favorite_id;
    }
    public Integer getUser_id() {
        return user_id;
    }
    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }
    public Integer getProduct_id() {
        return product_id;
    }
    public void setProduct_id(Integer product_id) {
        this.product_id = product_id;
    }

    

}