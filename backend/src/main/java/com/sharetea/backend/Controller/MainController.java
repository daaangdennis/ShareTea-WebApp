package com.sharetea.backend.Controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sharetea.backend.Entities.*;
import com.sharetea.backend.RequestBodies.CustomerBody;
import com.sharetea.backend.RequestBodies.EmployeeBody;
import com.sharetea.backend.Services.*;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@CrossOrigin(origins = "*")
public class MainController {
    @Autowired
    private Services service;
    

    public String findUserByAccessToken(HttpServletRequest request) throws URISyntaxException, IOException, InterruptedException{
        String auth = request.getHeader("Authorization");
        String url = "https://dev-1jps85kh7htbmqki.us.auth0.com/userinfo";
        
        HttpRequest get = HttpRequest.newBuilder()
        .uri(new URI(url))
        .header("Authorization", auth)
        .GET()
        .build();

        HttpClient httpClient = HttpClient.newHttpClient();
        HttpResponse<String> response = httpClient.send(get, HttpResponse.BodyHandlers.ofString());
        
        Integer code = response.statusCode();
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseBody = objectMapper.readTree(response.body());
        String email = responseBody.get("email").asText();

        return email;
    }



    @GetMapping("/")
    public String home() {
        return "Hello!";
    }

    @GetMapping("/customer/get")
    public Iterable<Customer> getCustomers() {
        return service.getAllCustomers();
    }

    @PostMapping("/customer/add")
    public Customer addCustomer(@RequestBody CustomerBody customer) {
        return service.addCustomer(customer);
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

    @PostMapping("/orders/add")
    public Orders addOrder(@RequestBody Orders order) {
        return service.addOrder(order);
    }

    @GetMapping("/product/get")
    public Map<String, Object> getProducts(HttpServletRequest request) throws URISyntaxException, IOException, InterruptedException {
        System.out.println(findUserByAccessToken(request));
        return service.getAllProducts();
    }


    @GetMapping("/product/getbestselling")
    public List<Map<String, Object>> getBestSelling() {
        return service.getBestSelling();  
    }

    @PostMapping("/product/update/{productID}")
    public Product updateProduct(@PathVariable Integer productID, @RequestBody Product productUpdate) {
        return service.updateProduct(productID, productUpdate);
    }

    @GetMapping("/product/getmostandleast")
    public List<List<String>> updateProduct(@RequestParam Integer customer_id) {
        return service.getMostandLeastOrdered(customer_id);
    }

    @GetMapping("/inventory/get")
    public Iterable<Inventory> getInventory() {
        return service.getAllInventory();
    }

    @PostMapping("/inventory/update/{inventoryID}")
    public Inventory updateInventory(@PathVariable Integer inventoryID, @RequestBody Inventory inventoryUpdate) {
        return service.updateInventory(inventoryID, inventoryUpdate);
    }

}