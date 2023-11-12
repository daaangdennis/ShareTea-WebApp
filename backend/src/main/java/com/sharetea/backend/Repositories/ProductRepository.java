package com.sharetea.backend.Repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "select name, price from product where product_id = ?1", nativeQuery = true)
    public Map<String, Object> findProductNamePrice(Integer productID);

    @Query("SELECT DISTINCT p.category FROM Product p")
    public List<String> findCategories();

    public List<Product> findAllByCategory(String category);

    @Query(value = "select name, url from product p join order_product op on p.product_id = op.product_id join orders o on o.order_id = op.order_id where customer_id = ?1 group by name,url order by count(*) desc", nativeQuery = true)
    public List<List<String>> getMostandLeastOrdered(Integer customer_id);

    @Query(value = "select * from inventory where is_topping = 'true'", nativeQuery = true)
    public List<Inventory> findToppings();

    @Query(value = "select price from product where product_id = ?1" , nativeQuery = true)
    public Double findPriceByID(Integer product_id);

    
    @Query(value = "select name, count(*) from order_product op  join orders ord on op.order_id = ord.order_id join product p on op.product_id = p.product_id where order_date >= ?1 and order_date <= ?2 group by name" , nativeQuery = true)
    public List<Map<String, Object>> productSales(LocalDate start, LocalDate end);

    @Query(value = "SELECT p1.name AS product1, p2.name AS product2, COUNT(DISTINCT op1.order_id) AS combination_count FROM order_product AS op1 JOIN order_product AS op2 ON op1.order_id = op2.order_id AND op1.product_id < op2.product_id JOIN orders AS o ON op1.order_id = o.order_id JOIN product AS p1 ON op1.product_id = p1.product_id JOIN product AS p2 ON op2.product_id = p2.product_id WHERE o.order_date >= ?1 AND o.order_date <= ?2 GROUP BY p1.name, p2.name ORDER BY combination_count desc", nativeQuery = true)
    public List<Map<String, Object>> commonPairings(LocalDate start, LocalDate end);
}