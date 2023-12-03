package com.sharetea.backend.Controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sharetea.backend.Entities.*;
import com.sharetea.backend.Services.*;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "*")
public class MainController {
    @Autowired
    private Services service;

    /**
     * API Route to get all user information
     * 
     * @return JSON object containing ID, names, email, and permissions
     */
    @GetMapping("/users/get")
    public List<Map<String, Object>> userGet() {
        return service.requestUsers();
    }

    /**
     * API Route to delete traces of the user from the database as well as Auth0
     * provider
     * 
     * @param userId ID of user in the database
     */
    @PostMapping("/users/delete")
    public void userDelete(@RequestParam Integer userId) {
        try {
            service.deleteUser(userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 
     * @param request HTTP request containing the user's authorization access token
     * @return JSON Object containing user's completed and pending orders and their
     *         full details
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @GetMapping("/user/orders")
    public Map<String, List<Map<String, Object>>> userOrders(HttpServletRequest request)
            throws URISyntaxException, IOException, InterruptedException {
        return service.userOrders(request, null);
    }

    /**
     * 
     * @param request HTTP request containing the user's authorization access token
     * @return JSON Object containing user's completed orders and their full details
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @GetMapping("/user/completed")
    public Map<String, List<Map<String, Object>>> userCompletedOrders(HttpServletRequest request)
            throws URISyntaxException, IOException, InterruptedException {
        return service.userCompletedOrders(request);
    }

    /**
     * 
     * @param email User's email in Auth0 and database
     * @return JSON Object containing user's completed and pending orders and their
     *         full details
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @GetMapping("/user/orders/manager")
    public Map<String, List<Map<String, Object>>> userOrders(@RequestParam String email)
            throws URISyntaxException, IOException, InterruptedException {
        return service.userOrders(null, email);
    }

    /**
     * 
     * @param request      HTTP request containing the user's authorization access
     *                     token
     * @param favoriteData JSON Object containing favorite product customization
     * @return String confirming favorite addition
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @PostMapping("/favorites/save")
    public String favorite(HttpServletRequest request, @RequestBody Map<String, Object> favoriteData)
            throws URISyntaxException, IOException, InterruptedException {
        return service.addFavorite(request, favoriteData);
    }

    /**
     * 
     * @param request HTTP request containing the user's authorization access token
     * @return JSON Object containing all of the user's favorite products and their
     *         customization
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @GetMapping("/favorites/get")
    public Map<String, Object> favorite(HttpServletRequest request)
            throws URISyntaxException, IOException, InterruptedException {
        return service.getFavorite(request);
    }

    /**
     * 
     * @param request        HTTP request containing the user's authorization access
     *                       token
     * @param orderProductID order_product_id which identifies favorite product in
     *                       the database
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @PostMapping("/favorites/delete")
    public void deleteFavorite(HttpServletRequest request, @RequestParam Integer orderProductID)
            throws URISyntaxException, IOException, InterruptedException {
        service.deleteFavorite(request, orderProductID);
    }

    @PostMapping("/users/add")
    public void addUser(@RequestParam String email, @RequestParam String role,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName, @RequestParam(required = false) String phone,
            @RequestParam(required = false) String address, @RequestParam(required = false) String SSN,
            @RequestParam(required = false) String picture)
            throws URISyntaxException, IOException, InterruptedException {
        service.addUser(firstName, lastName, email, role, phone, SSN, address, picture);
    }

    /**
     * 
     * @param userId    user_id from the database that identifies specific user
     * @param role      Optional role to be updated into the user
     * @param firstName Optional role to be updated into the user in the database
     * @param lastName  Optional role to be updated into the user in the database
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @PostMapping("/users/update")
    public void changePermissions(@RequestParam Integer userId, @RequestParam(required = false) String role,
            @RequestParam(required = false) String firstName, @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String phone, @RequestParam(required = false) String address,
            @RequestParam(required = false) String SSN, @RequestParam(required = false) String picture)
            throws URISyntaxException, IOException, InterruptedException {

        service.changePermissions(userId, role, firstName, lastName, phone, address, SSN, picture);
    }

    // @GetMapping("/orders/get")
    // public Iterable<Orders> getOrders() {
    // return service.getAllOrders();
    // }

    /**
     * 
     * @return Integer containing the next available order number
     */
    @GetMapping("/orders/next")
    public Integer getNextOrder() {
        return service.maxOrder();
    }

    /**
     * 
     * @param request   HTTP request containing the user's authorization access
     *                  token
     * @param orderData JSON Object containing full order data
     * @return JSON Object with the order's body
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @PostMapping("/orders/add")
    public Orders addOrder(HttpServletRequest request, @RequestBody Map<String, Object> orderData)
            throws URISyntaxException, IOException, InterruptedException {
        return service.addOrder(request, null, null, null, null, null, orderData);
    }

    /**
     * 
     * @param orderData JSON Object containing full order data
     * @param firstName Optional guest's first name
     * @param lastName  Optional guest's last name
     * @return JSON Object with the order's body
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @PostMapping("/orders/add/guest")
    public Orders addOrder(Map<String, Object> orderData, @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName)
            throws URISyntaxException, IOException, InterruptedException {
        if (firstName != null) {
            return service.addOrder(null, null, null, null, firstName, lastName, orderData);
        }
        return service.addOrder(null, null, null, null, null, null, orderData);
    }

    /**
     * API Route for cashier to add an order. Either both first name and last name
     * are passed, or only the user's email
     * 
     * @param email     Optional user's email
     * @param firstName Optional user's first name
     * @param lastName  Optional user's last name
     * @param orderData JSON Object containing full order data
     * @return JSON Object with the order's body
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    @PostMapping("/orders/cashieradd")
    public Orders cashierAddOrder(@RequestParam(required = false) String email,
            @RequestParam(required = false) String firstName, @RequestParam(required = false) String lastName,
            @RequestBody Map<String, Object> orderData) throws URISyntaxException, IOException, InterruptedException {
        if (firstName == null) {
            return service.addOrder(null, email, null, null, null, null, orderData);
        } else {
            return service.addOrder(null, null, firstName, lastName, null, null, orderData);
        }

    }

    /**
     * Marks order as completed in the database
     * 
     * @param orderID order_id from the database
     */
    @PostMapping("/orders/finish")
    public void orderFinish(@RequestParam Integer orderID) {
        service.finishOrder(orderID, false);
    }

    /**
     * Marks order as refunded / canceled in the database
     * 
     * @param orderID order_id from the database
     */
    @PostMapping("/orders/refund")
    public void orderRefund(@RequestParam Integer orderID) {
        service.finishOrder(orderID, true);
    }

    /**
     * Removes order history from the database
     * 
     * @param orderID order_id from the database
     */
    @PostMapping("/orders/remove")
    public void orderRemove(@RequestParam Integer orderID) {
        service.removeOrder(orderID);
    }

    /**
     * 
     * @return JSON Object containing pending orders and their full details
     */
    @GetMapping("/orders/pending")
    public Map<String, List<Map<String, Object>>> getPendingOrders() {
        return service.pendingOrders();
    }

    /**
     * 
     * @return JSON Object containing completed orders and their full details
     */
    @GetMapping("/orders/completed")
    public Map<String, List<Map<String, Object>>> CompletedOrders() {
        return service.completedOrders();
    }

    /**
     * 
     * @return JSON Object containing both product and toppings and their full
     *         details
     */
    @GetMapping("/product/get")
    public Map<String, Object> getProducts() {
        return service.getAllProducts();
    }

    /**
     * 
     * @param temperature Temperature for user's current location
     * @return JSON object with products and their details that match their weather
     *         with the user's temperature
     */
    @GetMapping("/product/get/weather")
    public Map<String, Object> getProductsWeather(@RequestParam Double temperature) {
        return service.weatherProducts(temperature);
    }

    /**
     * 
     * @return JSON object with the three best selling products
     */
    @GetMapping("/product/getbestselling")
    public Map<String, Object> getBestSelling() {
        return service.getBestSelling();
    }

    /**
     * Updates a current product in the database
     * 
     * @param productID product_id from the database
     * @param newName   Optional new name to assign to the product in the database
     * @param category  Optional new category to assign to the product in the
     *                  database
     * @param price     Optional new price to assign to the product in the database
     * @param weather   Optional new weather match to assign to the product in the
     *                  database
     * @param url       Optional new image URL to assign to the product in the
     *                  database
     * @return JSON object containing the product's updated body
     */
    @PostMapping("/menu/update")
    public Product updateProduct(@RequestParam Integer productID, @RequestParam(required = false) String newName,
            @RequestParam(required = false) String category, @RequestParam(required = false) Double price,
            @RequestParam(required = false) String weather, @RequestParam(required = false) String url) {
        return service.updateProduct(productID, newName, category, price, weather, url);
    }

    /**
     * Adds a new product to the database
     * 
     * @param name     Name to assign to the new product
     * @param category Category to assign to the new product
     * @param price    Price to assign to the new product
     * @param weather  Optional weather match to assign to the new product
     * @return
     */
    @PostMapping("/menu/add")
    public Product addProduct(@RequestParam String name, @RequestParam String category, @RequestParam Double price,
            @RequestParam(required = false) String weather) {
        return service.addProduct(name, category, price, weather);
    }

    /**
     * Deletes / deactivates a product in the database
     * 
     * @param productName name the product has in the database
     */
    @PostMapping("/menu/delete")
    public void deleteProduct(@RequestParam String productName) {
        service.deleteProduct(productName);
    }

    @GetMapping("/product/sales")
    public List<Map<String, Object>> productSales(@RequestParam String startDate, @RequestParam String endDate) {
        return service.productSales(LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

    @GetMapping("/product/commonpairings")
    public List<Map<String, Object>> commonPairs(@RequestParam String startDate, @RequestParam String endDate) {
        return service.commonPairs(LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

    @GetMapping("/inventory/get")
    public Iterable<Inventory> getInventory() {
        return service.getAllInventory();
    }

    @GetMapping("/inventory/low")
    public List<Map<String, Object>> getLowStock() {
        return service.lowStock();
    }

    @GetMapping("/inventory/excess")
    public List<Map<String, Object>> getLowStock(@RequestParam String date) {
        return service.excessStock(LocalDate.parse(date));
    }

    /**
     * Returns amount of individual inventory used between two dates
     * 
     * @param startDate Start date for data
     * @param endDate   End date for data
     * @return JSON Object containing all inventory names and their usage between
     *         dates
     */
    @GetMapping("/inventory/usage")
    public List<Map<String, Object>> inventoryUsage(@RequestParam String startDate, @RequestParam String endDate) {
        return service.inventoryUsage(LocalDate.parse(startDate), LocalDate.parse(endDate));
    }

    @PostMapping("/inventory/update")
    public Inventory updateInventory(@RequestParam Integer inventoryId, @RequestParam(required = false) String newName,
            @RequestParam(required = false) Integer quantity, @RequestParam(required = false) Boolean isTopping) {
        return service.updateInventory(inventoryId, newName, quantity, isTopping);
    }

    @PostMapping("/inventory/add")
    public Inventory addInventory(@RequestParam String inventoryName,
            @RequestParam(required = false) Integer quantity) {
        return service.addInventory(inventoryName, quantity);
    }

    @PostMapping("/inventory/delete")
    public String inventoryDelete(@RequestParam Integer inventoryId) {
        return service.deleteInventory(inventoryId);
    }

    /**
     * 
     * @return
     */
    @GetMapping("/categories/get")
    public List<String> getCategories() {
        return service.getCategories();
    }

    /**
     * Adds category into database
     * 
     * @param categoryName Name of category to be added into database
     */
    @PostMapping("/categories/add")
    public void addCategory(@RequestParam String categoryName) {
        service.addCategory(categoryName);
    }

    /**
     * Delete category from database and move products with that category to
     * "Others"
     * 
     * @param categoryName Name of the category in the datbase
     */
    @PostMapping("/categories/delete")
    public void deleteCategory(@RequestParam String categoryName) {
        service.deleteCategory(categoryName);
    }

}