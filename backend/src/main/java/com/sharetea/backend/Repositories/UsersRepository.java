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
public interface UsersRepository extends JpaRepository<Users, Integer> {
    public Users findByEmail(String email);

    @Transactional @Modifying @Query(value = "update users set order_count = order_count + 1 where user_id = ?1 ", nativeQuery = true)
    public void addOrderCount(Integer userID);

    @Query(value = "select first_name, last_name, email, position from users where first_name != '' order by position", nativeQuery = true)
    public List<Map<String, Object>> getUsers();

    @Transactional @Modifying @Query(value = "update orders set customer_id = 27 where customer_id = ?1", nativeQuery = true)
    public void deleteUserOrder(Integer customerID);

        
}