package com.sharetea.backend.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

import jakarta.transaction.Transactional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Transactional @Modifying @Query(value = "update customer set order_count = order_count + 1 where user_id = ?1 ", nativeQuery = true)
    public void addOrderCount(Integer userID);
}