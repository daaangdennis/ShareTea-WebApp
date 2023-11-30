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

    @GetMapping("/")
    public String home() {
        return "Hello!";
    }

    // @GetMapping("/access")
    // public Object access() {
    // return service.requestUsers();
    // }

    @GetMapping("/users/get")
    public List<Map<String, Object>> userGet() {
        return service.requestUsers();
    }

    @PostMapping("/users/delete")
    public void userDelete(@RequestParam Integer userId) {
        try {
            service.deleteUser(userId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @GetMapping("/user/orders")
    public Map<String, List<Map<String, Object>>> userOrders(HttpServletRequest request)
            throws URISyntaxException, IOException, InterruptedException {
        return service.userOrders(request, null);
    }

    @GetMapping("/user/completed")
    public Map<String, List<Map<String, Object>>> userCompletedOrders(HttpServletRequest request)
            throws URISyntaxException, IOException, InterruptedException {
        return service.userCompletedOrders(request);
    }

    @GetMapping("/user/orders/manager")
    public Map<String, List<Map<String, Object>>> userOrders(@RequestParam String email)
            throws URISyntaxException, IOException, InterruptedException {
        return service.userOrders(null, email);
    }

    @PostMapping("/favorites/save")
    public String favorite(HttpServletRequest request, @RequestBody Map<String, Object> favoriteData)
            throws URISyntaxException, IOException, InterruptedException {
        return service.addFavorite(request, favoriteData);
    }

    @GetMapping("/favorites/get")
    public Map<String, Object> favorite(HttpServletRequest request)
            throws URISyntaxException, IOException, InterruptedException {
        return service.getFavorite(request);
    }

    @PostMapping("/favorites/delete")
    public List<Integer> deleteFavorite(HttpServletRequest request, @RequestParam Integer orderProductID)
            throws URISyntaxException, IOException, InterruptedException {
        return service.deleteFavorite(request, orderProductID);
    }

    @GetMapping("/permissions")
    public String getPermissions() throws URISyntaxException, IOException, InterruptedException {
        return "You are a manager!";
    }

    @PostMapping("/users/update")
    public void changePermissions(@RequestParam Integer userId, @RequestParam(required = false) String role,
            @RequestParam(required = false) String firstName, @RequestParam(required = false) String lastName)
            throws URISyntaxException, IOException, InterruptedException {
        service.changePermissions(userId, role, firstName, lastName);
    }

    @GetMapping("/orders/get")
    public Iterable<Orders> getOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/orders/next")
    public Integer getNextOrder() {
        return service.maxOrder();
    }

    @PostMapping("/orders/add")
    public Orders addOrder(HttpServletRequest request, @RequestBody Map<String, Object> orderData)
            throws URISyntaxException, IOException, InterruptedException {
        return service.addOrder(request, null, null, null, orderData);
    }

    @PostMapping("/orders/add/guest")
    public Orders addOrder(Map<String, Object> orderData) throws URISyntaxException, IOException, InterruptedException {
        return service.addOrder(null, null, null, null, orderData);
    }

    @PostMapping("/orders/cashieradd")
    public Orders cashierAddOrder(@RequestParam(required = false) String email,
            @RequestParam(required = false) String firstName, @RequestParam(required = false) String lastName,
            @RequestBody Map<String, Object> orderData) throws URISyntaxException, IOException, InterruptedException {
        if (firstName == null) {
            return service.addOrder(null, email, null, null, orderData);
        } else {
            return service.addOrder(null, null, firstName, lastName, orderData);
        }

    }

    @PostMapping("/orders/finish")
    public void orderFinish(@RequestParam Integer orderID) {
        service.finishOrder(orderID, false);
    }

    @PostMapping("/orders/refund")
    public void orderRefund(@RequestParam Integer orderID) {
        service.finishOrder(orderID, true);
    }

    @PostMapping("/orders/remove")
    public String orderRemove(@RequestParam Integer orderID) {
        return service.removeOrder(orderID);
    }

    @GetMapping("/orders/pending")
    public Map<String, List<Map<String, Object>>> getPendingOrders() {
        return service.pendingOrders();
    }

    @GetMapping("/orders/completed")
    public Map<String, List<Map<String, Object>>> CompletedOrders() {
        return service.completedOrders();
    }

    // PARAM: HttpServletRequest request
    // System.out.println(findUserByAccessToken(request));

    @GetMapping("/product/get")
    public Map<String, Object> getProducts() {
        return service.getAllProducts();
    }

    @GetMapping("/product/get/weather")
    public Map<String, Object> getProductsWeather(@RequestParam Double temperature) {
        return service.weatherProducts(temperature);
    }

    @GetMapping("/product/getbestselling")
    public Map<String, Object> getBestSelling() {
        return service.getBestSelling();
    }

    @PostMapping("/menu/update")
    public Product updateProduct(@RequestParam Integer productID, @RequestParam(required = false) String newName,
            @RequestParam(required = false) String category, @RequestParam(required = false) Double price,
            @RequestParam(required = false) String weather, @RequestParam(required = false) String url) {
        return service.updateProduct(productID, newName, category, price, weather, url);
    }

    @PostMapping("/menu/add")
    public Product addProduct(@RequestParam String name, @RequestParam String category, @RequestParam Double price,
            @RequestParam(required = false) String weather) {
        return service.addProduct(name, category, price, weather);
    }

    @PostMapping("/menu/delete")
    public String deleteProduct(@RequestParam String productName) {
        return service.deleteProduct(productName);
    }

    @GetMapping("/product/getmostandleast")
    public List<List<String>> updateProduct(@RequestParam Integer customer_id) {
        return service.getMostandLeastOrdered(customer_id);
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

    @GetMapping("/categories/get")
    public List<String> getCategories() {
        return service.getCategories();
    }

    @PostMapping("/categories/add")
    public void addCategory(@RequestParam String categoryName) {
        service.addCategory(categoryName);
    }

    @PostMapping("/categories/delete")
    public void deleteCategory(@RequestParam String categoryName) {
        service.deleteCategory(categoryName);
    }

}