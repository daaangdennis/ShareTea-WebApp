package com.sharetea.backend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

@Repository
public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {
    @Query(value = "select p.product_id, p.name, p.url, p.price, p.category  from order_product op join product p on op.product_id = p.product_id join orders ord on op.order_id = ord.order_id group by p.product_id order by count(p.product_id) desc limit 5" , nativeQuery = true)
    public List<List<Object>> findBestSelling();
}