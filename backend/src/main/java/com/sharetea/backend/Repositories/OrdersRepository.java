package com.sharetea.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

import java.util.List;
import java.util.Map;


@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    @Query(value = "select order_id, order_date, first_name, last_name from orders join users on  orders.customer_id = users.user_id where is_pending = true", nativeQuery = true)
    public List<Map<String,Object>> pendingOrders();

}