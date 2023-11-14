package com.sharetea.backend.Services;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sharetea.backend.Entities.*;
import com.sharetea.backend.Repositories.*;
import com.sharetea.backend.RequestBodies.*;

import jakarta.servlet.http.HttpServletRequest;

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
    private InventoryProductRepository inventoryProductRepository;

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private ItemToppingsRepository itemToppingsRepository;

    @Autowired
    private UserFavoriteRepository userFavoriteRepository;



    public Map<String, String> findUserByAccessToken(HttpServletRequest request) throws URISyntaxException, IOException, InterruptedException{
        String auth = request.getHeader("Authorization");
        String url = "https://dev-1jps85kh7htbmqki.us.auth0.com/userinfo";
        
        HttpRequest get = HttpRequest.newBuilder()
        .uri(new URI(url))
        .header("Authorization", auth)
        .GET()
        .build();

        HttpClient httpClient = HttpClient.newHttpClient();
        HttpResponse<String> response = httpClient.send(get, HttpResponse.BodyHandlers.ofString());
        
        //Integer code = response.statusCode();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseBody = objectMapper.readTree(response.body());


        String email = responseBody.get("email").asText();
        String firstName = responseBody.get("given_name").asText();
        String lastName = responseBody.get("family_name").asText();
        Map<String, String> answerMap = new HashMap<>();
        answerMap.put("email", email); 
        answerMap.put("firstName", firstName); 
        answerMap.put("lastName", lastName); 

        return answerMap;
    }


    public Iterable<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    public Customer addCustomer(CustomerBody customerData) {
        Users user = new Users();
        user.setFirst_name(customerData.getFirstName());
        user.setLast_name(customerData.getLastName());
        user.setEmail(customerData.getEmail());
        user = usersRepository.save(user);

        Customer customer = new Customer();
        customer.setUser_id(user.getUser_id());
        customer = customerRepository.save(customer);
        return customer;
    }

    public List<List<String>> getMostandLeastOrdered(Integer customer_id) {
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



    public Orders addOrder(HttpServletRequest request, String cashierEmail, Map<String, Object> orderData) throws URISyntaxException, IOException, InterruptedException {
        Orders order = new Orders();

        if(request != null){
            Map<String, String> userInfo = findUserByAccessToken(request);
            String email = userInfo.get("email");
            String firstName = userInfo.get("firstName");
            String lastName = userInfo.get("lastName");
            Users user = usersRepository.findByEmail(email);
            if( user != null) {
                customerRepository.addOrderCount(user.getUser_id());
                order.setCustomer_id(user.getUser_id());
            }
            else{
                CustomerBody customer = new CustomerBody(firstName, lastName, email);
                Customer newCustomer = addCustomer(customer);
                order.setCustomer_id(newCustomer.getUser_id());
            }
        }
        else{
            Users user = usersRepository.findByEmail(cashierEmail);
            if( user != null) {
                customerRepository.addOrderCount(user.getUser_id());
                order.setCustomer_id(user.getUser_id());
            }
            else{
                CustomerBody customer = new CustomerBody(null, null, cashierEmail);
                Customer newCustomer = addCustomer(customer);
                order.setCustomer_id(newCustomer.getUser_id());
            }

        }

        order.setTotal(0.00);
        Double total = 0.00;
        
        ordersRepository.save(order);
        List<Map<String, Object>> items = (List<Map<String, Object>>) orderData.get("items");

        for (Map<String, Object> item : items) {
            Integer productID = (Integer) ((Map<String, Object>) item.get("product")).get("product_id");
            String note = (String) item.get("notes");
            String sugar = (String) item.get("sugar_level");
            String ice = (String) item.get("ice_level");

            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrder_id(order.getOrder_id());
            orderProduct.setProduct_id(productID);
            orderProduct.setQuantity(1); //Change maybe

            total += productRepository.findPriceByID(productID);
            
            if(note != null){
                orderProduct.setNote(note);
            }
            if(sugar != null){
                orderProduct.setSugar_level(sugar);
            }
            if(ice != null){
                orderProduct.setIce_level(ice);
            }

            orderProductRepository.save(orderProduct);

            List<Map<String, Object>> toppings = (List<Map<String, Object>>) item.get("toppings");
            if(toppings != null){
                for (Map<String, Object> topping : toppings) {
                    Integer inventoryID = (Integer) topping.get("inventory_id");

                    ItemToppings itemTopping = new ItemToppings();
                    itemTopping.setOrder_product_id(orderProduct.getOrder_product_id());
                    itemTopping.setInventory_id(inventoryID);
                    itemToppingsRepository.save(itemTopping);
                }
                total += toppings.size() * 0.75;
            }
        }
        order.setTotal(total);
        ordersRepository.save(order);

        System.out.println("Added order#" + order.getOrder_id());
        return order;
    }

    public String addFavorite(HttpServletRequest request, String productName) throws URISyntaxException, IOException, InterruptedException{
        Map<String, String> userInfo = findUserByAccessToken(request);
        String email = userInfo.get("email");
        Integer user_id = usersRepository.findByEmail(email).getUser_id();
        Product product = productRepository.findByName(productName);
        if(product == null){
            return "Couldn't find product.";
        }
        Integer productID = product.getProduct_id();
        if(productID == null){
            return "Couldn't find product.";
        }
        UserFavorite favorite = new UserFavorite();
        favorite.setProduct_id(productID);
        favorite.setUser_id(user_id);
        userFavoriteRepository.save(favorite);
        return "Added favorite.";
    }

    public Map<String, List<Map<String,Object>>> userOrders(HttpServletRequest request) throws URISyntaxException, IOException, InterruptedException{
        Map<String, String> userInfo = findUserByAccessToken(request);
        String email = userInfo.get("email");
        Integer customer_id = usersRepository.findByEmail(email).getUser_id();
        
        List<Map<String,Object>> pendingOrders = ordersRepository.userPendingOrders(customer_id);
        List<Map<String,Object>> completedOrders = ordersRepository.userCompletedOrders(customer_id);


        List<Map<String,Object>> pendingList = new ArrayList<>();
        List<Map<String,Object>> completedList = new ArrayList<>();

        Map<String, List<Map<String,Object>>> finalList = new HashMap<>();

        for(Map<String,Object> order : pendingOrders){
            Map<String,Object> orderMap = new HashMap<>();
            Integer orderID = (Integer) order.get("order_id");
            orderMap.put("order_id", orderID);
            orderMap.put("order_date", order.get("order_date"));
            orderMap.put("first_name", order.get("first_name"));
            orderMap.put("last_name", order.get("last_name"));

            List<Map<String,Object>> productList = orderProductRepository.getProductsbyOrderID(orderID);
            List<Map<String,Object>> itemList = new ArrayList<>();

            for(Map<String, Object> product : productList){
                Map<String,Object> itemMap = new HashMap<>();
                Map<String, Object> productNamePrice = productRepository.findProductNamePrice((Integer) product.get("product_id"));
                itemMap.put("product", productNamePrice.get("name"));
                itemMap.put("price", productNamePrice.get("price"));
                if(product.get("note") != null){
                    itemMap.put("note", product.get("note"));
                }
                if(product.get("sugar_level") != null){
                    itemMap.put("sugar_level", product.get("sugar_level"));
                }
                if(product.get("ice_level") != null){
                    itemMap.put("ice_level", product.get("ice_level"));
                }

                Integer order_product_id = (Integer) product.get("order_product_id");
                List<String> toppings = itemToppingsRepository.getToppingsByopID(order_product_id);
                itemMap.put("toppings", toppings);


                itemList.add(itemMap);
            }   

            orderMap.put("items", itemList);
            pendingList.add(orderMap);
        }

        for(Map<String,Object> order : completedOrders){
            Map<String,Object> orderMap = new HashMap<>();
            Integer orderID = (Integer) order.get("order_id");
            orderMap.put("order_id", orderID);
            orderMap.put("order_date", order.get("order_date"));
            orderMap.put("first_name", order.get("first_name"));
            orderMap.put("last_name", order.get("last_name"));

            List<Map<String,Object>> productList = orderProductRepository.getProductsbyOrderID(orderID);
            List<Map<String,Object>> itemList = new ArrayList<>();

            for(Map<String, Object> product : productList){
                Map<String,Object> itemMap = new HashMap<>();
                Map<String, Object> productNamePrice = productRepository.findProductNamePrice((Integer) product.get("product_id"));
                itemMap.put("product", productNamePrice.get("name"));
                itemMap.put("price", productNamePrice.get("price"));
                if(product.get("note") != null){
                    itemMap.put("note", product.get("note"));
                }
                if(product.get("sugar_level") != null){
                    itemMap.put("sugar_level", product.get("sugar_level"));
                }
                if(product.get("ice_level") != null){
                    itemMap.put("ice_level", product.get("ice_level"));
                }

                Integer order_product_id = (Integer) product.get("order_product_id");
                List<String> toppings = itemToppingsRepository.getToppingsByopID(order_product_id);
                itemMap.put("toppings", toppings);


                itemList.add(itemMap);
            }   

            orderMap.put("items", itemList);
            completedList.add(orderMap);
        }

        finalList.put("pending", pendingList);
        finalList.put("completed", completedList);
        return finalList;

    }


    public List<Map<String,Object>> pendingOrders(){
        List<Map<String,Object>> pendingOrders = ordersRepository.pendingOrders();

        List<Map<String,Object>> finalPendingList = new ArrayList<>();

        for(Map<String,Object> order : pendingOrders){
            Map<String,Object> orderMap = new HashMap<>();
            Integer orderID = (Integer) order.get("order_id");
            orderMap.put("order_id", orderID);
            orderMap.put("order_date", order.get("order_date"));
            orderMap.put("first_name", order.get("first_name"));
            orderMap.put("last_name", order.get("last_name"));
            orderMap.put("total", order.get("total"));

            List<Map<String,Object>> productList = orderProductRepository.getProductsbyOrderID(orderID);
            List<Map<String,Object>> itemList = new ArrayList<>();

            for(Map<String, Object> product : productList){
                Map<String,Object> itemMap = new HashMap<>();
                Map<String, Object> productNamePrice = productRepository.findProductNamePrice((Integer) product.get("product_id"));
                itemMap.put("product", productNamePrice.get("name"));
                itemMap.put("price", productNamePrice.get("price"));
                if(product.get("note") != null){
                    itemMap.put("note", product.get("note"));
                }
                if(product.get("sugar_level") != null){
                    itemMap.put("sugar_level", product.get("sugar_level"));
                }
                if(product.get("ice_level") != null){
                    itemMap.put("ice_level", product.get("ice_level"));
                }

                Integer order_product_id = (Integer) product.get("order_product_id");
                List<String> toppings = itemToppingsRepository.getToppingsByopID(order_product_id);
                itemMap.put("toppings", toppings);


                itemList.add(itemMap);
            }   

            orderMap.put("items", itemList);
            finalPendingList.add(orderMap);
        }
        return finalPendingList;

    }





    
    public Map<String, Object> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<Inventory> toppings = inventoryRepository.findToppings();

        Map<String, Object> productMap = new HashMap<>();
        productMap.put("products", products);

        productMap.put("toppings", toppings);

        return productMap;
    }

    public Map<String, Object> getBestSelling() {
        List<Integer> bestSellingID = orderProductRepository.findBestSelling();
        List<Optional<Product>> bestSelling = new ArrayList<>();
        List<Inventory> toppings = inventoryRepository.findToppings();

        for(int i = 0; i < bestSellingID.size(); ++i){
            bestSelling.add(productRepository.findById(bestSellingID.get(i)));
        }

        Map<String, Object> bestSellingMap = new HashMap<>();
        bestSellingMap.put("products", bestSelling);
        bestSellingMap.put("toppings", toppings);
        return bestSellingMap;
    }





    public List<Map<String, Object>> productSales(LocalDate start, LocalDate end){
        return productRepository.productSales(start, end);
    }

    public List<Map<String, Object>> commonPairs(LocalDate start, LocalDate end){
        return productRepository.commonPairings(start, end);
    }

    public Product updateProduct(String name, String category, Double price) {
        Product product = productRepository.findByName(name);
        if(product == null){
            if(name == null && category == null && price == null){
                return null;
            }
            Product newProduct = new Product();
            newProduct.setName(name);
            newProduct.setCategory(category);
            newProduct.setPrice(price);
            productRepository.save(newProduct);
        }
        else{
            if(category != null){
                product.setCategory(category);
            }
            if(price != null){
                product.setPrice(price);
            }
            return productRepository.save(product);
        }
        return null;
    }

    public String deleteProduct(String productName){
        Product product = productRepository.findByName(productName);
        if(product == null){
            return ("Could not find " + productName + " in the product list.");
        }
        String name = product.getName();
        productRepository.deleteByName(name);
        return ("Deleted " + name);
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    public Inventory updateInventory(String name, Integer quantity) {
        Inventory inventory = inventoryRepository.findByName(name);
        if(inventory == null){
            Inventory newInventory = new Inventory();
            newInventory.setName(name);
            if(quantity != null){
                newInventory.setQuantity(quantity);
            }
            inventoryRepository.save(newInventory);
        }
        else{
            if(quantity != null){
                inventory.setQuantity(quantity);
                inventory.setLast_updated(LocalDate.now());
                return inventoryRepository.save(inventory);
            }
        }
        return null;
    }

    public String deleteInventory(String name){
        Inventory inventory = inventoryRepository.findByName(name);
        if(inventory == null){
            return ("Could not find " + name + " in the inventory list.");
        }
        String invName = inventory.getName();
        inventoryRepository.deleteByName(invName);
        return ("Deleted " + invName);
    }

    public List<Map<String, Object>> lowStock(){
        return inventoryRepository.findLowStock();
    }

    public List<Map<String, Object>> excessStock(LocalDate date) {
        List<Map<String, Object>> finalStock = new ArrayList<>();
        List<Map<String, Object>> allStock = inventoryProductRepository.excessStock(date);
    
        for (Map<String, Object> s : allStock) {
            BigDecimal used = new BigDecimal(s.get("used").toString());
            BigDecimal quantity = new BigDecimal(s.get("quantity").toString());
    
            BigDecimal ratio = used.divide(used.add(quantity), 2, RoundingMode.HALF_UP);
    
            BigDecimal threshold = new BigDecimal("0.10");
            if (ratio.compareTo(threshold) < 0) {
                finalStock.add(s);
            }
        }
        return finalStock;
    }

}
