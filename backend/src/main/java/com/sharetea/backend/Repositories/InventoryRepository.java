package com.sharetea.backend.Repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

import jakarta.transaction.Transactional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    Inventory findByName(String name);
    @Transactional void deleteByName(String name);

    @Query(value = "select * from inventory where is_topping = 'true'", nativeQuery = true)
    public List<Inventory> findToppings();

    @Query(value = "select name, quantity from inventory where quantity < 100", nativeQuery = true)
    public List<Map<String, Object>> findLowStock();

    List<Inventory> findByActive(Boolean active);

}