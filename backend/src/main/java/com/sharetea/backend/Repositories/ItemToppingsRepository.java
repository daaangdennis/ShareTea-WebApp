package com.sharetea.backend.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

@Repository
public interface ItemToppingsRepository extends JpaRepository<ItemToppings, Integer> {


    @Query(value = "select name from item_toppings i join inventory inv on i.inventory_id = inv.inventory_id where order_product_id = ?1", nativeQuery = true)
    public List<String> getToppingsByopID(Integer opID);

}