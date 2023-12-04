package com.sharetea.backend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

@Repository
public interface ItemToppingsRepository extends JpaRepository<ItemToppings, Integer> {

    /**
     * Gets topping names associated with an order_product
     * @param opID order_product_id to identify order_product
     * @return List of strings with topping names
     */
    @Query(value = "select name from item_toppings i join inventory inv on i.inventory_id = inv.inventory_id where order_product_id = ?1", nativeQuery = true)
    public List<String> getToppingsByopID(Integer opID);

    /**
     * Gets topping IDs associated with an order_product
     * @param order_product_id order_product_id to identify order product
     * @return List of integers with topping IDs
     */
    @Query(value = "select item_toppings_id from item_toppings where order_product_id = ?1", nativeQuery = true)
    List<Integer> findByOrder_product_id(Integer order_product_id);

}