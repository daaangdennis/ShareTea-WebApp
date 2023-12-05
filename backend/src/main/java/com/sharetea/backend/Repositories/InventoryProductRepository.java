package com.sharetea.backend.Repositories;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

@Repository
public interface InventoryProductRepository extends JpaRepository<InventoryProduct, Integer> {
    /**
     * Gets inventory items that have sold less than 10% of their inventory after a date
     * 
     * @param date Date that denotes start of inventory usage counting
     * @return JSON Object with inventory items that sold less than 10% of their
     *         stock
     */
    @Query(value = "SELECT ip.inventory_id, (SELECT i.name FROM inventory i WHERE i.inventory_id = ip.inventory_id) AS name, SUM((SELECT COALESCE(SUM(op.quantity),0) FROM order_product op WHERE op.product_id = ip.product_id AND op.order_id IS NOT NULL AND op.order_id IN(SELECT o.order_id FROM orders o WHERE o.order_date >= ?1))) AS used, (SELECT COALESCE(SUM(i.quantity),0) FROM inventory i WHERE i.inventory_id = ip.inventory_id) AS quantity FROM inventory_product ip GROUP BY ip.inventory_id, name", nativeQuery = true)
    public List<Map<String,Object>> excessStock(LocalDate date);

    /**
     * Gets amount of individual inventory used between two dates
     * 
     * @param startDate Start date for data
     * @param endDate   End date for data
     * @return JSON Object containing all inventory names and their usage between
     *         dates
     */
    @Query(value = "SELECT ip.inventory_id, (SELECT i.name FROM inventory i WHERE i.inventory_id = ip.inventory_id) AS inventory_name,  SUM((SELECT COALESCE(SUM(op.quantity),0) FROM order_product op WHERE op.product_id = ip.product_id AND op.order_id IN(SELECT o.order_id FROM orders o WHERE o.order_date >= date (?1) and o.order_date < date (?2) + 1))) AS quantity_used FROM inventory_product ip GROUP BY ip.inventory_id, inventory_name", nativeQuery = true)
    public List<Map<String,Object>> inventoryUsage(LocalDate start, LocalDate end);

}