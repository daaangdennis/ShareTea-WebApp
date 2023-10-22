package com.sharetea.backend.Services;

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
    private InventoryRepository inventoryRepository;



    public Iterable<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer addCustomer(Customer customer) {
        return customerRepository.save(customer);
    }


    public Iterable<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee addEmployee(Employee employee){
        return employeeRepository.save(employee);
    }


    public Iterable<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }
    public Orders addOrder(Orders order){
        return ordersRepository.save(order);
    }


    public Iterable<Product> getAllProducts() {
        return productRepository.findAll();
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


    public Iterable<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

}
