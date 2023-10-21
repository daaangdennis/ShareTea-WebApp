package com.sharetea.backend.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sharetea.backend.Entities.*;
import com.sharetea.backend.Services.*;


@RestController
public class TableController {
    @Autowired
    private Services CustomerSrv;
    
    @GetMapping("/customer/get")
    public Iterable<Customer> getCustomers() {
        return CustomerSrv.getAllCustomers();
    }

    @PostMapping("/customer/add")
    public Customer addCustomer(@RequestBody Customer customer) {
        return CustomerSrv.addCustomer(customer);
    }

    @GetMapping("/employee/get")
    public Iterable<Employee> getEmployees() {
        return CustomerSrv.getAllEmployees();
    }

    @PostMapping("/employee/add")
    public Employee addEmployee(@RequestBody Employee employee) {
        return CustomerSrv.addEmployee(employee);
    }


}