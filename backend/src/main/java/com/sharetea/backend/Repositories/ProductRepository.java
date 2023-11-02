package com.sharetea.backend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query("SELECT DISTINCT p.category FROM Product p")
    public List<String> findCategories();

    public List<Product> findAllByCategory(String category);

    @Query(value = "select name, url from product p join order_product op on p.product_id = op.product_id join orders o on o.order_id = op.order_id where customer_id = ?1 group by name,url order by count(*) desc", nativeQuery = true)
    public List<List<String>> getMostandLeastOrdered(Integer customer_id);

    @Query(value = "select * from inventory where is_topping = 'true'", nativeQuery = true)
    public List<Inventory> findToppings();

}