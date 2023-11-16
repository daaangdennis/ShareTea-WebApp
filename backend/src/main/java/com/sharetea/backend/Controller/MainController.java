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
import com.sharetea.backend.RequestBodies.EmployeeBody;
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

    @GetMapping("/access")
    public Object access() {
        return service.requestUsers();
    }

    // @GetMapping("/user/orders")
    // public Map<String, List<Map<String, Object>>> userOrders(HttpServletRequest request) throws URISyntaxException, IOException, InterruptedException {
    //     return service.userOrders(request);
    // }

    @PostMapping("/user/favorite")
    public String favorite(HttpServletRequest request, @RequestParam String productName) throws URISyntaxException, IOException, InterruptedException {
        return service.addFavorite(request, productName);
    }

    @GetMapping("/permissions")
    public String getPermissions() throws URISyntaxException, IOException, InterruptedException {
        return "You are a manager!";
    }

    @GetMapping("/permissions/change")
    public void changePermissions(@RequestParam String userID, @RequestParam String position) throws URISyntaxException, IOException, InterruptedException {
         service.changePermissions(userID, position);
    }

    

    @GetMapping("/employee/get")
    public Iterable<Employee> getEmployees() {
        return service.getAllEmployees();
    }

    @PostMapping("/employee/add")
    public Employee addEmployee(@RequestBody EmployeeBody employee) {
        return service.addEmployee(employee);
    }

    @GetMapping("/orders/get")
    public Iterable<Orders> getOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/orders/next")
    public Integer getNextOrder(){
        return service.maxOrder();    
    }

    @PostMapping("/orders/add")
    public Orders addOrder(HttpServletRequest request, @RequestBody Map<String, Object> orderData) throws URISyntaxException, IOException, InterruptedException {
        return service.addOrder(request, null, null, null, orderData);
    }

    @PostMapping("/orders/cashieradd")
    public Orders cashierAddOrder(@RequestParam(required = false) String email, @RequestParam(required = false) String firstName, @RequestParam(required = false) String lastName, @RequestBody Map<String, Object> orderData) throws URISyntaxException, IOException, InterruptedException {
        if(firstName == null){
            return service.addOrder(null, email, null, null, orderData);
        }
        else{
            return service.addOrder(null, null, firstName, lastName, orderData);
        }

    }

    @GetMapping("/orders/pending")
    public List<Map<String,Object>> getPendingOrders() {
        return service.pendingOrders();
    }


    //PARAM: HttpServletRequest request
    //System.out.println(findUserByAccessToken(request));

    @GetMapping("/product/get")
    public Map<String, Object> getProducts() {
        return service.getAllProducts();
    }


    @GetMapping("/product/getbestselling")
    public Map<String, Object> getBestSelling() {
        return service.getBestSelling();  
    }

    @PostMapping("/product/update")
    public Product updateProduct(@RequestParam String productName, @RequestParam(required = false) String category, @RequestParam(required = false) Double price) {
        return service.updateProduct(productName, category, price);
    }

    @PostMapping("/product/delete")
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

    @PostMapping("/inventory/update")
    public Inventory updateInventory(@RequestParam String inventoryName, @RequestParam(required = false) Integer quantity) {
        return service.updateInventory(inventoryName, quantity);
    }

    @PostMapping("/inventory/delete")
    public String inventoryDelete(@RequestParam String inventoryName) {
        return service.deleteInventory(inventoryName);
    }

}