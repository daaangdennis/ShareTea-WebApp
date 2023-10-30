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
import com.sharetea.backend.RequestBodies.*;

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

    @Autowired
    private UsersRepository usersRepository;



    public Iterable<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer addCustomer(CustomerBody customerData) {
        Users user = new Users();
        user.setFirst_name(customerData.getFirstName());
        user.setLast_name(customerData.getLastName());
        user.setToken_id(customerData.getTokenID());
        user.setEmail(customerData.getEmail());
        user = usersRepository.save(user);

        Customer customer = new Customer();
        customer.setUser_id(user.getUser_id());
        customer = customerRepository.save(customer);
        return customer;
    }

    public List<List<String>> getMostandLeastOrdered(Integer customer_id){
        List<List<String>> mostAndLeastAll = productRepository.getMostandLeastOrdered(customer_id);
        List<List<String>> mostAndLeast = new ArrayList<>();
       
        mostAndLeast.add(mostAndLeastAll.get(0));
        mostAndLeast.add(mostAndLeastAll.get(1));
        mostAndLeast.add(mostAndLeastAll.get(2));

        mostAndLeast.add(mostAndLeastAll.get(mostAndLeastAll.size() - 1));
        mostAndLeast.add(mostAndLeastAll.get(mostAndLeastAll.size() - 2));
        mostAndLeast.add(mostAndLeastAll.get(mostAndLeastAll.size() - 3));

        return mostAndLeast;
    }

  





    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee addEmployee(EmployeeBody employeeData) {
        Users user = new Users();
        user.setFirst_name(employeeData.getFirstName());
        user.setLast_name(employeeData.getLastName());
        user.setToken_id(employeeData.getTokenID());
        user.setEmail(employeeData.getEmail());
        user = usersRepository.save(user);

        Employee employee = new Employee();
        employee.setUser_id(user.getUser_id());
        employee.setPosition(employeeData.getPosition());
        employee = employeeRepository.save(employee);
        return employee;
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
    public Map<String, Object> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<Inventory> toppings = inventoryRepository.findToppings();
    
        Map<String, Object> productMap = new HashMap<>();
        productMap.put("products", products);
        
        productMap.put("toppings", toppings);
    
        return productMap;
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
