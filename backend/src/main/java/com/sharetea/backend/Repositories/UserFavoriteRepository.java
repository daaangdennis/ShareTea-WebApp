package com.sharetea.backend.Repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

import jakarta.transaction.Transactional;

@Repository
public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Integer> {

    @Query(value = "select * from user_favorite where user_id = ?1 and product_id = ?2", nativeQuery = true)
    public UserFavorite checkFavorite(Integer userID, Integer productID);

    @Query(value = "select order_product_id, product_id, note, sugar_level, ice_level from order_product where order_product_id in (select order_product_id from user_favorite where user_id = ?1)", nativeQuery = true)
    public List<Map<String, Object>> getUserFavorite(Integer customerID);

    @Transactional @Modifying @Query(value = "delete from user_favorite where order_product_id = ?1", nativeQuery = true)
    public void deleteByOP(Integer opID);
}