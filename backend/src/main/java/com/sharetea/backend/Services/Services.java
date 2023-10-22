package com.sharetea.backend.Services;

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

}
