package com.sharetea.backend.Services;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sharetea.backend.Entities.*;
import com.sharetea.backend.Repositories.*;

@Service
public class Services {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private OrdersRepository ordersRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderProductRepository orderProductRepository;

    @Autowired
    private InventoryRepository inventoryRepository;



    public Iterable<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }


    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee addEmployee(Employee employee){
        return employeeRepository.save(employee);
    }


    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }
    public Orders addOrder(Orders order){
        return ordersRepository.save(order);
    }

    
    public List<Map<String, Object>> getProductsbyCategory() {
        List<String> categories = productRepository.findCategories();
        List<Map<String, Object>> result = new ArrayList<>();
    
        for (String category : categories) {
            List<Product> products = productRepository.findAllByCategory(category);
            
            Map<String, Object> categoryMap = new HashMap<>();
            categoryMap.put("name", category);
    
            categoryMap.put("products", products);
            result.add(categoryMap);
        }
    
        return result;
    }
    public List<String> getAllProducts() {
        return productRepository.findCategories();
    }
    public List<List<Object>> getBestSelling() {
        return orderProductRepository.findBestSelling();
    }
    public Product addProduct(Product product){
        return productRepository.save(product);
    }
    public Product updateProduct(Integer productID, Product productUpdate){
        Optional<Product> productOptional = productRepository.findById(productID);

        if(productOptional.isPresent()){
            Product product = productOptional.get();

            if (productUpdate.getName() != null) {
                product.setName(productUpdate.getName());;
            }
            if (productUpdate.getPrice() != null) {
                product.setPrice(productUpdate.getPrice());
            }
            if (productUpdate.getCategory() != null) {
                product.setCategory(productUpdate.getCategory());
            }
            if (productUpdate.getUrl() != null) {
                product.setUrl(productUpdate.getUrl());
            }

            return productRepository.save(product);
        }
        else{
            return null; 
        }
    }


    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }
    public Inventory updateInventory(Integer inventoryID, Inventory inventoryUpdate){
        Optional<Inventory> inventoryOptional = inventoryRepository.findById(inventoryID);

        if(inventoryOptional.isPresent()){
            Inventory inventory = inventoryOptional.get();

            if (inventoryUpdate.getName() != null) {
                inventory.setName(inventoryUpdate.getName());
            }
            if (inventoryUpdate.getQuantity() != null) {
                inventory.setQuantity(inventoryUpdate.getQuantity());
            }
            if (inventoryUpdate.getIs_topping() != null) {
                inventory.setIs_topping(inventoryUpdate.getIs_topping());
            }
            inventory.setLast_updated(new Date());

            return inventoryRepository.save(inventory);
        }
        else{
            return null; 
        }
    }

}
