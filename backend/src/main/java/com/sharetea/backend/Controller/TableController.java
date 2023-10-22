package com.sharetea.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sharetea.backend.Entities.*;
import com.sharetea.backend.Services.*;

@CrossOrigin(origins = "*")
@RestController
public class TableController {
    @Autowired
    private Services service;
    
    @GetMapping("/customer/get")
    public Iterable<Customer> getCustomers() {
        return service.getAllCustomers();
    }
    @PostMapping("/customer/add")
    public Customer addCustomer(@RequestBody Customer customer) {
        return service.addCustomer(customer);
    }


    @GetMapping("/employee/get")
    public Iterable<Employee> getEmployees() {
        return service.getAllEmployees();
    }
    @PostMapping("/employee/add")
    public Employee addEmployee(@RequestBody Employee employee) {
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
    public Iterable<Product> getProducts() {
        return service.getAllProducts();
    }

    @PostMapping("/product/update/{productID}")
    public Product updateProduct(@PathVariable Integer productID, @RequestBody Product productUpdate) {
        return service.updateProduct(productID, productUpdate);
    }


    @GetMapping("/inventory/get")
    public Iterable<Inventory> getInventory() {
        return service.getAllInventory();
    }


}