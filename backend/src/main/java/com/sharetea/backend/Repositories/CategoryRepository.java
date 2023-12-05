package com.sharetea.backend.Repositories;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    /**
     * Gets category names
     * @return List of strings with category names
     */
    @Query(value = "SELECT name from category", nativeQuery = true)
    public List<String> getCategoryNames();

    /**
     * Gets category object given a name
     * @param name Category name
     * @return Category object
     */
    @Query(value = "select * from category where lower(name) = lower(?1)", nativeQuery = true)
    Category findByName(String name);
}