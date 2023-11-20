package com.sharetea.backend.Services;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpRequest.BodyPublisher;
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

    @Autowired
    private CategoryRepository categoryRepository;

    public String requestToken(){
        String url = "https://dev-1jps85kh7htbmqki.us.auth0.com/oauth/token";
        String payload = "{\"client_id\":\"bmpUm9FNggk0QcmUSmu4zL1tFGsKujpi\",\"client_secret\":\"st8DfPIL7XGTOI0nQ6reqP6M44yahE10jtMJtA2f_jcTkL_lPfcxLYTjc_dOG12b\",\"audience\":\"https://dev-1jps85kh7htbmqki.us.auth0.com/api/v2/\",\"grant_type\":\"client_credentials\"}";
        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(new URI(url))
                    .header("content-type", "application/json")
                    .method("POST", HttpRequest.BodyPublishers.ofString(payload))
                    .build();

            HttpClient client = HttpClient.newHttpClient();

            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode responseBody = objectMapper.readTree(response.body());
            String accessToken = responseBody.get("access_token").asText();

            return accessToken;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Map<String, Object>> requestUsers(){
        return usersRepository.getUsers();
    }


    public void changePermissions(String email, String position) throws URISyntaxException, IOException, InterruptedException{
        Users thisUser = usersRepository.findByEmail(email);
        if(thisUser == null){
            return;
        }

        String encodedEmail = URLEncoder.encode(email, "UTF-8");
        String emailURL = "https://dev-1jps85kh7htbmqki.us.auth0.com/api/v2/users-by-email?fields=user_id&email=" + encodedEmail;
        String token = requestToken();
        HttpRequest getID = HttpRequest.newBuilder()
                .uri(new URI(emailURL))
                .header("Accept", "application/json")
                .header("Authorization", "Bearer " + token)
                .GET()
                .build();

        HttpClient httpClient = HttpClient.newHttpClient();
        HttpResponse<String> IDResponse = httpClient.send(getID, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseBody = objectMapper.readTree(IDResponse.body());
        String userID = responseBody.get(0).get("user_id").asText();
        System.out.println(userID);


        String user = URLEncoder.encode(userID, "UTF-8");
        String url = "https://dev-1jps85kh7htbmqki.us.auth0.com/api/v2/users/" + user +"/permissions";
        try {  
            Map<String, Object> deleteMap = new HashMap<>();
            List<Map<String, String>> listMap = new ArrayList<>();

            Map<String, String> cashier = new HashMap<>();
            cashier.put("resource_server_identifier", "https://sharetea315/");
            cashier.put("permission_name", "cashier");
            Map<String, String> manager = new HashMap<>();
            manager.put("resource_server_identifier", "https://sharetea315/");
            manager.put("permission_name", "manager");
            listMap.add(cashier);
            listMap.add(manager);
            deleteMap.put("permissions", listMap);

            String deleteMapString = objectMapper.writeValueAsString(deleteMap);
            
            BodyPublisher body = HttpRequest.BodyPublishers.ofString(deleteMapString);
            HttpRequest deletePermissions = HttpRequest.newBuilder()
            .uri(new URI(url))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer " + token)
            .method("DELETE", body)
            .build();

            HttpResponse<String> response = httpClient.send(deletePermissions, HttpResponse.BodyHandlers.ofString());
            System.out.println(response);

            if(position.equals("cashier") || position.equals("manager")){
                Map<String, Object> addMap = new HashMap<>();
                List<Map<String, String>> addListMap = new ArrayList<>();
                if(position.equals("cashier")){
                    addListMap.add(cashier);
                    thisUser.setPosition("cashier");
                }
                else{
                    addListMap.add(manager);
                    thisUser.setPosition("manager");
                }
                addMap.put("permissions", addListMap);

                String addMapString = objectMapper.writeValueAsString(addMap);
                BodyPublisher addBody = HttpRequest.BodyPublishers.ofString(addMapString);
                HttpRequest addPermissions = HttpRequest.newBuilder()
                .uri(new URI(url))
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + token)
                .method("POST", addBody)
                .build();

                HttpResponse<String> addResponse = httpClient.send(addPermissions, HttpResponse.BodyHandlers.ofString());
                usersRepository.save(thisUser);
                System.out.println(addResponse);

            }
            else{
                thisUser.setPosition(null);
                usersRepository.save(thisUser);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteUser(String email) throws IOException, InterruptedException, URISyntaxException{
        Integer userID = usersRepository.findByEmail(email).getUser_id();
        if(userID == null || userID == 27){ //27 is deleted user default, don't delete
            return;
        }
        usersRepository.deleteUserOrder(userID);
        usersRepository.deleteById(userID);

        String encodedEmail = URLEncoder.encode(email, "UTF-8");
        String emailURL = "https://dev-1jps85kh7htbmqki.us.auth0.com/api/v2/users-by-email?fields=user_id&email=" + encodedEmail;
        String token = requestToken();
        HttpRequest getID = HttpRequest.newBuilder()
                .uri(new URI(emailURL))
                .header("Accept", "application/json")
                .header("Authorization", "Bearer " + token)
                .GET()
                .build();

        HttpClient httpClient = HttpClient.newHttpClient();
        HttpResponse<String> IDResponse = httpClient.send(getID, HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode responseBody = objectMapper.readTree(IDResponse.body());
        String strUserID = responseBody.get(0).get("user_id").asText();

        String user = URLEncoder.encode(strUserID, "UTF-8");
        String url = "https://dev-1jps85kh7htbmqki.us.auth0.com/api/v2/users/" + user;
        try {  
            BodyPublisher body = HttpRequest.BodyPublishers.ofString("");
            HttpRequest delete = HttpRequest.newBuilder()
            .uri(new URI(url))
            .header("Content-Type", "application/json")
            .header("Authorization", "Bearer " + token)
            .method("DELETE", body)
            .build();

            HttpResponse<String> response = httpClient.send(delete, HttpResponse.BodyHandlers.ofString());
            System.out.println(response);
        } 
        catch(Exception e){e.printStackTrace();}
    }


    public Map<String, String> findUserByAccessToken(HttpServletRequest request) throws URISyntaxException, IOException, InterruptedException{
        String auth = request.getHeader("Authorization");
        if(auth == null){
            return null;
        }
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

    public String addFavorite(HttpServletRequest request, String productName) throws URISyntaxException, IOException, InterruptedException{
        Map<String, String> userInfo = findUserByAccessToken(request);
        String email = userInfo.get("email");
        Integer user_id = usersRepository.findByEmail(email).getUser_id();
        Product product = productRepository.findByName(productName);
        if(product == null){
            return "Couldn't find product.";
        }
        Integer productID = product.getProduct_id();
        UserFavorite favorite = new UserFavorite();
        favorite.setProduct_id(productID);
        favorite.setUser_id(user_id);
        userFavoriteRepository.save(favorite);
        return "Added favorite.";
    }

    public Map<String, Object> getFavorite(HttpServletRequest request){
        Map<String, String> userInfo = null;
        try {
            userInfo = findUserByAccessToken(request);
        } catch(Exception e){e.printStackTrace();}

        String email = userInfo.get("email");
        Integer user_id = usersRepository.findByEmail(email).getUser_id();
        List<Map<String, Object>> favorites = userFavoriteRepository.getUserFavorite(user_id);
        List<Inventory> toppings = inventoryRepository.findToppings();

        Map<String, Object> favoriteMap = new HashMap<>();
        favoriteMap.put("products", favorites);
        favoriteMap.put("toppings", toppings);
        return favoriteMap;
    }

    public Map<String, Object> weatherProducts(Double temperature){
        List<Product> products = null;
        if(temperature <= 17){
            products = productRepository.findByWeather("cold"); 
        }
        else if(temperature <= 30){
           products = productRepository.findByWeather("mild");  
        }
        else{
            products = productRepository.findByWeather("hot");
        }

        List<Inventory> toppings = inventoryRepository.findToppings();

        Map<String, Object> weatherMap = new HashMap<>();
        weatherMap.put("products", products);
        weatherMap.put("toppings", toppings);

        return weatherMap;
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


    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }



    public Orders addOrder(HttpServletRequest request, String cashierEmail, String cashierFirstName, String cashierLastName, Map<String, Object> orderData) throws URISyntaxException, IOException, InterruptedException {
        Orders order = new Orders();

        if(request != null){
            Map<String, String> userInfo = findUserByAccessToken(request);
            String email = userInfo.get("email");
            String firstName = userInfo.get("firstName");
            String lastName = userInfo.get("lastName");
            Users user = usersRepository.findByEmail(email);
            if( user != null) {
                if(user.getFirst_name() != firstName){
                    user.setFirst_name(firstName);
                }
                if(user.getLast_name() != lastName){
                    user.setLast_name(lastName);
                }
                usersRepository.addOrderCount(user.getUser_id());
                order.setCustomer_id(user.getUser_id());
            }
            else{
                Users newUser = new Users();
                newUser.setEmail(email);
                newUser.setFirst_name(firstName);
                newUser.setLast_name(lastName);
                usersRepository.save(newUser);
                order.setCustomer_id(newUser.getUser_id());
            }
        }
        else{
            if(cashierEmail != null){
                Users user = usersRepository.findByEmail(cashierEmail);
                if( user != null) {
                    usersRepository.addOrderCount(user.getUser_id());
                    order.setCustomer_id(user.getUser_id());
                }
                else{
                    Users newUser = new Users();
                    newUser.setEmail(cashierEmail);
                    usersRepository.save(newUser);
                    order.setCustomer_id(newUser.getUser_id());
                    // CustomerBody customer = new CustomerBody(null, null, cashierEmail);
                    // Customer newCustomer = addCustomer(customer);
                    // order.setCustomer_id(newCustomer.getUser_id());   
                }
            }
            else if(cashierFirstName != null && cashierLastName != null){
                Users newUser = new Users();
                newUser.setFirst_name(cashierLastName);
                newUser.setLast_name(cashierLastName);
                usersRepository.save(newUser);
                order.setCustomer_id(newUser.getUser_id());
            }
            else{
                return(null);
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

    public Map<String, List<Map<String,Object>>> userOrders(HttpServletRequest request, String paramEmail) throws URISyntaxException, IOException, InterruptedException{
        String email = "";
        if(request != null)
        {
            Map<String, String> userInfo = findUserByAccessToken(request);
            if(userInfo == null){
                return null;
            }
            email = userInfo.get("email");
        }
        else if(paramEmail != null){
            email = paramEmail;
        }
        Integer customer_id = usersRepository.findByEmail(email).getUser_id();
        if(customer_id == null){
            return null;
        }
        List<Map<String,Object>> pendingOrders = ordersRepository.userPendingOrders(customer_id);
        List<Map<String,Object>> completedOrders = ordersRepository.userCompletedOrders(customer_id);
        List<Map<String,Object>> pendingList = new ArrayList<>();
        List<Map<String,Object>> completedList = new ArrayList<>();

        Map<String, List<Map<String,Object>>> finalList = new HashMap<>();

        for(Map<String,Object> order : pendingOrders){
            Map<String,Object> orderMap = new HashMap<>(order);
            Integer orderID = (Integer) order.get("order_id");

            List<Map<String,Object>> productList = orderProductRepository.getProductsbyOrderID(orderID);
            List<Map<String,Object>> itemList = new ArrayList<>();

            for(Map<String, Object> product : productList){
                Map<String,Object> itemMap = new HashMap<>(product);
                Map<String, Object> productNamePrice = productRepository.findProductNamePrice((Integer) product.get("product_id"));
                itemMap.put("product", productNamePrice.get("name"));
                itemMap.put("price", productNamePrice.get("price"));

                Integer order_product_id = (Integer) product.get("order_product_id");
                List<String> toppings = itemToppingsRepository.getToppingsByopID(order_product_id);
                itemMap.put("toppings", toppings);

                itemList.add(itemMap);
            }   

            orderMap.put("items", itemList);
            pendingList.add(orderMap);
        }

        for(Map<String,Object> order : completedOrders){
            Map<String,Object> orderMap = new HashMap<>(order);
            Integer orderID = (Integer) order.get("order_id");

            List<Map<String,Object>> productList = orderProductRepository.getProductsbyOrderID(orderID);
            List<Map<String,Object>> itemList = new ArrayList<>();

            for(Map<String, Object> product : productList){
                Map<String,Object> itemMap = new HashMap<>();
                Map<String, Object> productNamePrice = productRepository.findProductNamePrice((Integer) product.get("product_id"));
                itemMap.put("product", productNamePrice.get("name"));
                itemMap.put("price", productNamePrice.get("price"));

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
            Map<String,Object> orderMap = new HashMap<>(order);
            Integer orderID = (Integer) order.get("order_id");

            List<Map<String,Object>> productList = orderProductRepository.getProductsbyOrderID(orderID);
            List<Map<String,Object>> itemList = new ArrayList<>();

            for(Map<String, Object> product : productList){
                Map<String,Object> itemMap = new HashMap<>(product);
                Map<String, Object> productNamePrice = productRepository.findProductNamePrice((Integer) product.get("product_id"));
                itemMap.put("product", productNamePrice.get("name"));
                itemMap.put("price", productNamePrice.get("price"));

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

    public Integer maxOrder(){
        return ordersRepository.maxOrder();
    }

    public void finishOrder(Integer orderID){
        Orders order = ordersRepository.findById(orderID).get();
        order.setIs_pending(false);
        ordersRepository.save(order);
    }




    
    public Map<String, Object> getAllProducts() {
        List<Product> products = productRepository.findByActive(true);
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

    public List<String> getCategories(){
        return categoryRepository.getCategoryNames();
    }

    public void addCategory(String categoryName){
        Category newCategory = new Category();
        newCategory.setName(categoryName);
        categoryRepository.save(newCategory);
    }

    public String deleteCategory(String categoryName){
        Category del = categoryRepository.findById(categoryName).get();
        if(del == null){
            return "Error deleting " + categoryName;
        }
        categoryRepository.delete(del);
        return "Deleted " + categoryName;
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
            newProduct.setActive(true);
            productRepository.save(newProduct);
        }
        else{
            if(product.getActive() == false){
                product.setActive(true);
            }
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
            return ("Could not find " + productName + " in the inventory list.");
        }
        product.setActive(false);
        productRepository.save(product);
        return ("Deleted " + productName);
    }

    public List<Inventory> getAllInventory() {
        return inventoryRepository.findByActive(true);
    }

    public Inventory updateInventory(String name, Integer quantity) {
        Inventory inventory = inventoryRepository.findByName(name);
        if(inventory == null){
            Inventory newInventory = new Inventory();
            newInventory.setName(name);
            newInventory.setActive(true);
            if(quantity != null){
                newInventory.setQuantity(quantity);
            }
            inventoryRepository.save(newInventory);
        }
        else{
            if(inventory.getActive() == false){
                inventory.setActive(true);
            }
            if(quantity != null){
                inventory.setQuantity(quantity);
                inventory.setLast_updated(LocalDate.now());
            }
            return inventoryRepository.save(inventory);
        }
        return null;
    }

    public String deleteInventory(String name){
        Inventory inventory = inventoryRepository.findByName(name);
        if(inventory == null){
            return ("Could not find " + name + " in the inventory list.");
        }
        String invName = inventory.getName();
        inventory.setActive(false);
        inventoryRepository.save(inventory);
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
