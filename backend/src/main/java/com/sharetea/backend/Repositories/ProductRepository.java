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


}