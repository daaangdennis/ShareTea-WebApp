package com.sharetea.backend.Repositories;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.sharetea.backend.Entities.*;

import jakarta.transaction.Transactional;


@Repository
public interface UsersRepository extends JpaRepository<Users, Integer> {
    /**
     * Finds a user in the database given their email 
     * @param email Email to identify user
     * @return Users object that matches email
     */
    public Users findByEmail(String email);

    /**
     * When making an order, adds 1 to user's order count
     * @param userID ID to identify user
     */
    @Transactional @Modifying @Query(value = "update users set order_count = order_count + 1 where user_id = ?1 ", nativeQuery = true)
    public void addOrderCount(Integer userID);

    /**
     * Gets users' information
     * @return JSON Object with database user details
     */
    @Query(value = "select user_id, first_name, last_name, email, phone_number as phone, ssn as \"SSN\", position as role, phone_number as phone, address, picture from users where email != '' and user_id != 27 and email != '' order by user_id", nativeQuery = true)
    public List<Map<String, Object>> getUsers();

    /**
     * Single user information to display on navbar on website
     * @param email Email to identify user 
     * @return JSON Object with current user information
     */
    @Query(value = "select first_name || ' ' || last_name AS name, email, picture from users where email = ?1", nativeQuery = true)
    public Map<String, Object> getUserInfo(String email);

    /**
     * Changes user's order to deleted user when wanting to delete user
     * @param customerID ID to identify user
     */
    @Transactional @Modifying @Query(value = "update orders set customer_id = 27 where customer_id = ?1", nativeQuery = true)
    public void deleteUserOrder(Integer customerID);
}