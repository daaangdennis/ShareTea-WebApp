package com.sharetea.backend.Repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

import jakarta.transaction.Transactional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    /**
     * Finds inventory in the database by its name 
     * @param name Name of the inventory
     * @return Inventory object
     */
    @Query(value = "select * from inventory where name = ?1", nativeQuery = true)
    Inventory findByName(String name);
    
    /**
     * Deletes inventory by name
     * @param name Inventory name
     */
    @Transactional void deleteByName(String name);

    /**
     * Selects inventory items that are toppings
     * @return List of inventory objects
     */
    @Query(value = "select * from inventory where active = 'true' and is_topping = 'true'", nativeQuery = true)
    public List<Inventory> findToppings();

    /**
     * Gets inventory items under 100 stock quantity
     * @return JSON Object for inventory and their stock remaining
     */
    @Query(value = "select name, quantity from inventory where quantity < 100", nativeQuery = true)
    public List<Map<String, Object>> findLowStock();

    /**
     * Finds inventory items that are active
     * @param active Boolean flag for active / inactive
     * @return List of inventory objects
     */
    List<Inventory> findByActive(Boolean active);

    /**
     * Gets inventory items in a favorite order_product
     * @param opID order_product_id to identify order_product
     * @return JSON Object that with topping details
     */
    @Query(value = "select * from inventory where inventory_id in (select inventory_id from item_toppings where order_product_id = ?1)", nativeQuery = true)
    public List<Map<String, Object>> getFavoriteToppings(Integer opID);

    /**
     * Gets item_topping_ids for a favorite product
     * @param opID order_product_id to identify order_product
     * @return List of integer item_toppings_id
     */
    @Query(value = "select item_toppings_id from item_toppings where order_product_id = ?1", nativeQuery = true)
    public List<Integer> getFavoriteItemToppings(Integer opID);
    
    /**
     * Subtracts inventory stock quantity during ordering process
     * @param productID product_id to identify product and then its recipe
     */
    @Transactional @Modifying @Query(value = "UPDATE inventory SET quantity = quantity - 1 WHERE inventory_id IN (SELECT inventory_id FROM inventory_product WHERE product_id = ?1)", nativeQuery = true)
    public void subtractInventory(Integer productID);

    /**
     * Subtracts 1 unit quantity from inventory items
     * @param inventories Inventory list to identify inventory items to be subtracted
     */
    @Transactional @Modifying @Query(value = "UPDATE inventory SET quantity = quantity - 1 WHERE inventory_id IN (:inventories) ", nativeQuery = true)
    public void subtractInventoryByID(@Param("inventories") List<Integer> inventories);
}