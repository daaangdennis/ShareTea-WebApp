package com.sharetea.backend.Repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {
    @Query(value = "select p.product_id from order_product op join product p on op.product_id = p.product_id join orders ord on op.order_id = ord.order_id group by p.product_id order by count(p.product_id) desc limit 3" , nativeQuery = true)
    public List<Integer> findBestSelling();

    @Query(value = "select order_product_id, product_id, note, sugar_level, ice_level from order_product where order_id = ?1" , nativeQuery = true)
    public List<Map<String,Object>> getProductsbyOrderID(Integer orderID);

    @Query(value = "select order_product_id from order_product where order_id = ?1", nativeQuery = true)
    List<Integer> findByOrder_id(Integer order_id);
}