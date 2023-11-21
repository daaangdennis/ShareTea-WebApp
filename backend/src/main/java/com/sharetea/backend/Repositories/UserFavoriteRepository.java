package com.sharetea.backend.Repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

@Repository
public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Integer> {
    @Query(value = "select * from product where product_id in(select product_id from user_favorite where user_id = ?1)", nativeQuery = true)
    public List<Map<String, Object>> getUserFavorite(Integer userID);
}