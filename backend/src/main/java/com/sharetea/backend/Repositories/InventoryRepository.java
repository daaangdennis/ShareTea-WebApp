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

    @Query(value = "select * from inventory where name = ?1", nativeQuery = true)
    Inventory findByName(String name);
    
    @Transactional void deleteByName(String name);

    @Query(value = "select * from inventory where active = 'true' and is_topping = 'true'", nativeQuery = true)
    public List<Inventory> findToppings();

    @Query(value = "select name, quantity from inventory where quantity < 100", nativeQuery = true)
    public List<Map<String, Object>> findLowStock();

    List<Inventory> findByActive(Boolean active);

    @Query(value = "select * from inventory where inventory_id in (select inventory_id from item_toppings where order_product_id = ?1)", nativeQuery = true)
    public List<Map<String, Object>> getFavoriteToppings(Integer opID);

    @Query(value = "select item_toppings_id from item_toppings where order_product_id = ?1", nativeQuery = true)
    public List<Integer> getFavoriteItemToppings(Integer opID);
    
    @Transactional @Modifying @Query(value = "UPDATE inventory SET quantity = quantity - 1 WHERE inventory_id IN (SELECT inventory_id FROM inventory_product WHERE product_id = ?1)", nativeQuery = true)
    public void subtractInventory(Integer productID);

    @Transactional @Modifying @Query(value = "UPDATE inventory SET quantity = quantity - 1 WHERE inventory_id IN (:inventories) ", nativeQuery = true)
    public void subtractInventoryByID(@Param("inventories") List<Integer> inventories);
}