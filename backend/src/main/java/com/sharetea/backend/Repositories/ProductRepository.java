package com.sharetea.backend.Repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

import jakarta.transaction.Transactional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    /**
     * Gets product details given its product_id
     * @param productID product_id to identify product 
     * @return
     */
    @Query(value = "select * from product where product_id = ?1", nativeQuery = true)
    Map<String, Object> MapById(Integer productID);

    /**
     * Gets active or inactive products
     * @param active Check for active or inactive product
     * @return List of products that are active or inactive
     */
    List<Product> findByActive(Boolean active);

    /**
     * Gets list of products that match the weather
     * @param weather Weather to match ("cold", "hot", "mild")
     * @return List of products that match weather parameter
     */
    @Query(value = "select * from product where weather = ?1 and active = true", nativeQuery = true)
    List<Product> findByWeather(String weather);
    
    /**
     * Gets product by its name 
     * @param name Name to identify product
     * @return Product object
     */
    Product findByName(String name);

    /**
     * Deletes product given its name 
     * @param name Name to identify product
     */
    @Transactional void deleteByName(String name);

    /**
     * Gets product name and price given a product_id
     * @param productID product_id to identify product
     * @return JSON Object containing product name and price
     */
    @Query(value = "select name, price from product where product_id = ?1", nativeQuery = true)
    public Map<String, Object> findProductNamePrice(Integer productID);

    /**
     * Gets distinct category names given to current products
     * @return List of strings with category names
     */
    @Query("SELECT DISTINCT p.category FROM Product p")
    public List<String> findCategories();
    
    /**
     * Gets products that match category name parameter
     * @param category Name of category to match 
     * @return List of products 
     */
    public List<Product> findAllByCategory(String category);


    /**
     * Gets inventory items that are also a topping
     * @return List of inventory items 
     */
    @Query(value = "select * from inventory where is_topping = 'true'", nativeQuery = true)
    public List<Inventory> findToppings();

    /**
     * Gets price of product given its ID
     * @param product_id product_id to identify product
     * @return Double price of product
     */
    @Query(value = "select price from product where product_id = ?1" , nativeQuery = true)
    public Double findPriceByID(Integer product_id);

    /**
     * Gets quantity sold for products in the database
     * @param start Date to start query
     * @param end Date to end query
     * @return JSON object containing product and its quantity sold
     */
    @Query(value = "select name, count(*) from order_product op  join orders ord on op.order_id = ord.order_id join product p on op.product_id = p.product_id where order_date >= ?1 and order_date <= ?2 group by name" , nativeQuery = true)
    public List<Map<String, Object>> productSales(LocalDate start, LocalDate end);

    /**
     * Gets common pairings between two dates for items sold together
     * @param start Date to start query
     * @param end Date to end query
     * @return JSON object containing two products, and their quantity sold together 
     */
    @Query(value = "SELECT p1.name AS product1, p2.name AS product2, COUNT(DISTINCT op1.order_id) AS combination_count FROM order_product AS op1 JOIN order_product AS op2 ON op1.order_id = op2.order_id AND op1.product_id < op2.product_id JOIN orders AS o ON op1.order_id = o.order_id JOIN product AS p1 ON op1.product_id = p1.product_id JOIN product AS p2 ON op2.product_id = p2.product_id WHERE o.order_date >= ?1 AND o.order_date <= ?2 GROUP BY p1.name, p2.name ORDER BY combination_count desc", nativeQuery = true)
    public List<Map<String, Object>> commonPairings(LocalDate start, LocalDate end);
}