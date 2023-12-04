package com.sharetea.backend.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

import java.util.List;
import java.util.Map;


@Repository
public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    /**
     * 
     * @return JSON object containing pending orders' details 
     */
    @Query(value = "select order_id, order_date, first_name, last_name, total from orders join users on  orders.customer_id = users.user_id where is_pending = true order by order_date desc", nativeQuery = true)
    public List<Map<String,Object>> pendingOrders();

    /**
     * 
     * @return JSON object containing completed orders' details 
     */
    @Query(value = "select order_id, order_date, first_name, last_name, total, is_pending, is_refunded from orders join users on  orders.customer_id = users.user_id where is_pending = false order by order_date desc", nativeQuery = true)
    public List<Map<String,Object>> completedOrders();

    /**
     * 
     * @param customerID ID to identify user
     * @return JSON object containing user's pending orders' details 
     */    
    @Query(value = "select order_id, order_date, first_name, last_name, total from orders join users on  orders.customer_id = users.user_id where is_pending = true and customer_id = ?1 order by order_date desc", nativeQuery = true)
    public List<Map<String,Object>> userPendingOrders(Integer customerID);

    /**
     * 
     * @param customerID ID to identify user
     * @return JSON object containing user's completed orders' details 
     */    
    @Query(value = "select order_id, order_date, first_name, last_name, total, is_pending, is_refunded from orders join users on  orders.customer_id = users.user_id where is_pending = false and customer_id = ?1 order by order_date desc", nativeQuery = true)
    public List<Map<String,Object>> userCompletedOrders(Integer customerID);

    /**
     * Gets next available order_id
     * @return Integer for order_id 
     */
    @Query(value = "select max(order_id)+1 from orders", nativeQuery = true)
    public Integer maxOrder();

}