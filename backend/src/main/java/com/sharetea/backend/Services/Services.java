package com.sharetea.backend.Services;

import java.io.IOException;
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

    /**
     * Retrieves access token to authenticate request to management API
     * @return String with access token 
     */
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

    /**
     * 
     * @return JSON Object with users and their information from database
     */
    public List<Map<String, Object>> requestUsers(){
        return usersRepository.getUsers();
    }

    /**
     * 
     * @param request Headers that contain access token for authentication
     * @return Returns user's name, email, and picture from the database
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    public Map<String, Object> userInfo(HttpServletRequest request) throws URISyntaxException, IOException, InterruptedException{
        Map<String, String> userInfo = findUserByAccessToken(request);
        if(userInfo == null){
            return null;
        }
        String email = userInfo.get("email");

        return usersRepository.getUserInfo(email);
    }

    /**
     * Adds a new user in database and prepares role for when that user signs in onto the website through Oauth2
     * @param firstName Optional new user's first name 
     * @param lastName Optional new user's last name 
     * @param email New user's email 
     * @param permission New user's role 
     * @param phoneNumber Optional new user's phone number 
     * @param SSN Optional new user's SSN
     * @param address Optional new user's address
     * @param picture Optional new user's picture
     */
    public void addUser(String firstName, String lastName, String email, String permission, String phoneNumber, String SSN, String address, String picture){
        Users checkUser = usersRepository.findByEmail(email);
        if(checkUser != null){
            return;
        }
        Users user = new Users();
        if(email == null || permission == null){
            return;
        }
        
        user.setEmail(email);
        user.setPosition(permission);
        if(firstName != null){
            user.setFirst_name(firstName);
        }
        if(lastName != null){
            user.setLast_name(lastName);
        }
        if(address != null){
            user.setAddress(address);
        }
        if(phoneNumber != null){
            user.setPhone_number(phoneNumber);
        }
        if(SSN != null){
            user.setSsn(SSN);
        }
        if(picture != null){
            user.setPicture(picture);
        }
        usersRepository.save(user);
    }

    /**
     * Updates user details in the database
     * @param id User's id from the database
     * @param position Optional new role
     * @param firstName Optional new first name
     * @param lastName Optional new last name
     * @param phoneNumber Optional new phone number
     * @param address Optional new address
     * @param SSN Optional new SSN
     * @param picture Optional new picture
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    public void changePermissions(Integer id, String position, String firstName, String lastName, String phoneNumber, String address, String SSN, String picture) throws URISyntaxException, IOException, InterruptedException{
        Users thisUser = usersRepository.findById(id).get();
        if(thisUser == null){
            return;
        }
        if(firstName != null){
            thisUser.setFirst_name(firstName);
        }
        if(lastName != null){
            thisUser.setLast_name(lastName);
        }
        if(phoneNumber != null){
            thisUser.setPhone_number(phoneNumber);
        }
        if(address != null){
            thisUser.setAddress(address);
        }
        if(SSN != null){
            thisUser.setSsn(SSN);
        }
        if(picture != null){
            thisUser.setPicture(picture);
        }
        usersRepository.save(thisUser);
        
        String email = thisUser.getEmail();
        if(thisUser.getPosition() == null){
            return;
        }
        if(position != null && !position.toLowerCase().equals(thisUser.getPosition().toLowerCase())){
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

            if(IDResponse.body().equals("[]")){
                return;
            }

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
                Map<String, String> customer = new HashMap<>();
                customer.put("resource_server_identifier", "https://sharetea315/");
                customer.put("permission_name", "customer");
                Map<String, String> admin = new HashMap<>();
                admin.put("resource_server_identifier", "https://sharetea315/");
                admin.put("permission_name", "admin");

                listMap.add(cashier);
                listMap.add(manager);
                listMap.add(customer);
                listMap.add(admin);
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

                if(position.toLowerCase().equals("cashier") || position.toLowerCase().equals("manager") || position.toLowerCase().equals("customer") || position.toLowerCase().equals("admin")){
                    Map<String, Object> addMap = new HashMap<>();
                    List<Map<String, String>> addListMap = new ArrayList<>();
                    if(position.toLowerCase().equals("cashier")){
                        addListMap.add(cashier);
                        thisUser.setPosition("cashier");
                    }
                    else if(position.toLowerCase().equals("manager")){
                        addListMap.add(manager);
                        thisUser.setPosition("manager");
                    }
                    else if(position.toLowerCase().equals("customer")){
                        addListMap.add(customer);
                        thisUser.setPosition("customer");
                    }
                    else if(position.toLowerCase().equals("admin")){
                        addListMap.add(admin);
                        thisUser.setPosition("admin");
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
                    thisUser.setPosition("customer");
                    usersRepository.save(thisUser);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    /**
     * Deletes and user and their permissions from the database and Auth0
     * @param id User's id from the database
     * @throws IOException
     * @throws InterruptedException
     * @throws URISyntaxException
     */
    public void deleteUser(Integer id) throws IOException, InterruptedException, URISyntaxException{
        Users thisUser = usersRepository.findById(id).get();
        String email = thisUser.getEmail();
        changePermissions(thisUser.getUser_id(), "delete", null, null, null, null, null, null);
        if(id == null || id == 27 || id == 48){ //27 is deleted user default, 48 is guest user, don't delete
            return;
        }
        usersRepository.deleteUserOrder(id);
        List<Integer> favOPIds = userFavoriteRepository.getFavoriteIDs(id);
        for(Integer favID : favOPIds){
            deleteFavorite(null, favID);
        }
        usersRepository.deleteById(id);

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
        if(IDResponse.body().equals("[]")){
                return;
        }

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



    /**
     * Retrieves single saved user's information through Auth0's API
     * @param request Headers that contain access token for authentication
     * @return Map containing user info if access token is valid
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
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

    /**
     * Adds a favorite customized product to the user in the database
     * @param request Headers that contain access token for authentication
     * @param favoriteData JSON object order customization data
     * @return String for add success
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    public String addFavorite(HttpServletRequest request, Map<String, Object> favoriteData) throws URISyntaxException, IOException, InterruptedException{
        Map<String, String> userInfo = findUserByAccessToken(request);
        String email = userInfo.get("email");
        Integer user_id = usersRepository.findByEmail(email).getUser_id();
        
        Integer productID = (Integer) favoriteData.get("productID");
        List<Integer> toppingIDs = (List<Integer>) favoriteData.get("toppings");
        String note = (String) favoriteData.get("notes");
        String ice = (String) favoriteData.get("ice_level");
        String sugar = (String) favoriteData.get("sugar_level");

        OrderProduct favOP = new OrderProduct();
        favOP.setProduct_id(productID);
        favOP.setNote(note);
        favOP.setIce_level(ice);
        favOP.setSugar_level(sugar);
        favOP.setQuantity(1);
        orderProductRepository.save(favOP);
    
        for(Integer t : toppingIDs){
            ItemToppings i = new ItemToppings();
            i.setInventory_id(t);
            i.setOrder_product_id(favOP.getOrder_product_id());
            itemToppingsRepository.save(i);
        }

        UserFavorite favorite = new UserFavorite();
        favorite.setOrder_product_id(favOP.getOrder_product_id());
        favorite.setUser_id(user_id);
        userFavoriteRepository.save(favorite);
        return "Added favorite.";
    }

    /**
     * Gets favorite products for user
     * @param request Headers that contain access token for authentication
     * @return JSON Object containing the user's favorite products
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    public Map<String, Object> getFavorite(HttpServletRequest request) throws URISyntaxException, IOException, InterruptedException{
        Map<String, String> userInfo = findUserByAccessToken(request);
        String email = userInfo.get("email");
        Integer user_id = usersRepository.findByEmail(email).getUser_id();

        List<Map<String, Object>> favorites = userFavoriteRepository.getUserFavorite(user_id);
        
        List<Map<String, Object>> favList = new ArrayList<>();
        for(Map<String, Object> f : favorites){
            Map<String, Object> currMap = new HashMap<>();
            Integer productID = (Integer) f.get("product_id");
            currMap.put("notes", (String) f.get("note"));
            currMap.put("ice_level", (String) f.get("ice_level"));
            currMap.put("sugar_level", (String) f.get("sugar_level"));
            currMap.put("product", productRepository.MapById(productID));

            Integer opID = (Integer) f.get("order_product_id");
            currMap.put("order_product_id", opID);
            currMap.put("toppings", inventoryRepository.getFavoriteToppings(opID));

            favList.add(currMap);
        }

        Map<String, Object> finalList = new HashMap<>();
        finalList.put("items", favList);
        finalList.put("total", 0);

        return finalList;
    }

    /**
     * Deletes single favorite product for a user
     * @param request Headers that contain access token for authentication
     * @param opID order_product_id from database that identifies a favorite product
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    public void deleteFavorite(HttpServletRequest request, Integer opID) throws URISyntaxException, IOException, InterruptedException{
        // Map<String, String> userInfo = findUserByAccessToken(request);
        // String email = userInfo.get("email");
        // Integer user_id = usersRepository.findByEmail(email).getUser_id();

        List<Integer> deleteToppings = inventoryRepository.getFavoriteItemToppings(opID);
        itemToppingsRepository.deleteAllById(deleteToppings);
        userFavoriteRepository.deleteByOP(opID);
        orderProductRepository.deleteById(opID);
    }

    /**
     * Gets certain products given temperature
     * @param temperature Temperature parameter
     * @return JSON Object with products in their suitable weather
     */
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

    /**
     * 
     * @return List of order objects
     */
    public List<Orders> getAllOrders() {
        return ordersRepository.findAll();
    }
    
    /**
     * Adds an order to the database
     * @param request Headers that contain access token for authentication
     * @param cashierEmail Optional cashier entered customer email
     * @param requestFirstName Optional customer first name
     * @param requestLastName Optional customer last name
     * @param orderData JSON Object containing order data
     * @return JSON Object showing database order body
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    public Orders addOrder(HttpServletRequest request, String cashierEmail, String requestFirstName, String requestLastName, Map<String, Object> orderData) throws URISyntaxException, IOException, InterruptedException {
        Orders order = new Orders();

        if(request != null){
            Map<String, String> userInfo = findUserByAccessToken(request);
            String email = userInfo.get("email");
            String firstName = userInfo.get("firstName");
            String lastName = userInfo.get("lastName");
            Users user = usersRepository.findByEmail(email);
            if( user != null) {
                if(user.getFirst_name() == null){
                    user.setFirst_name(firstName);
                    user.setLast_name(lastName);
                }
                usersRepository.addOrderCount(user.getUser_id());
                order.setCustomer_id(user.getUser_id());
            }
            else{
                return null;
            }
        }
        else if(cashierEmail != null || requestFirstName != null){
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
                }
            }
            else if(requestFirstName != null){
                Users newUser = new Users();
                newUser.setFirst_name(requestFirstName);
                newUser.setLast_name(requestLastName != null ? requestLastName : "");
                usersRepository.save(newUser);
                order.setCustomer_id(newUser.getUser_id());
            }
        }
        else{
            order.setCustomer_id(48);
            usersRepository.addOrderCount(48);
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
            inventoryRepository.subtractInventory(productID);

            List<Map<String, Object>> toppings = (List<Map<String, Object>>) item.get("toppings");
            if(toppings != null){
                List<Integer> invIDList = new ArrayList<>();
                for (Map<String, Object> topping : toppings) {
                    Integer inventoryID = (Integer) topping.get("inventory_id");
                    invIDList.add(inventoryID);

                    ItemToppings itemTopping = new ItemToppings();
                    itemTopping.setOrder_product_id(orderProduct.getOrder_product_id());
                    itemTopping.setInventory_id(inventoryID);
                    itemToppingsRepository.save(itemTopping);
                }
                inventoryRepository.subtractInventoryByID(invIDList);
                total += toppings.size() * 0.75;
            }

        }
        order.setTotal(total);
        ordersRepository.save(order);

        System.out.println("Added order#" + order.getOrder_id());
        return order;
    }

    /**
     * Deletes single order history from the database
     * @param orderID order_id from the database to identify order
     */
    public void removeOrder(Integer orderID){
        Optional<Orders> order = ordersRepository.findById(orderID);
        if(!order.isPresent()){
            return;
        }
        
        List<Integer> op = orderProductRepository.findByOrder_id(orderID);
        List<Integer> it = new ArrayList<>();
        for (Integer o : op){
            it.addAll(itemToppingsRepository.findByOrder_product_id(o));
        }
        itemToppingsRepository.deleteAllById(it);
        orderProductRepository.deleteAllById(op);
        ordersRepository.deleteById(orderID);
    }

    /**
     * Gets pending and completed orders for a user
     * @param request Headers that contain access token for authentication
     * @param paramEmail Optional cashier entered user email
     * @return JSON Object with user's pending and completed order history
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
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
        List<Map<String,Object>> pendingList = new ArrayList<>();
        
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
        if(paramEmail == null){
            List<Map<String,Object>> completedOrders = ordersRepository.userCompletedOrders(customer_id);
            List<Map<String,Object>> completedList = new ArrayList<>();
            for(Map<String,Object> order : completedOrders){
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
                completedList.add(orderMap);
            }
            finalList.put("completed", completedList);
        }

        finalList.put("pending", pendingList);
        return finalList;
    }

    /**
     * Gets user completed orders
     * @param request Headers that contain access token for authentication
     * @return JSON Object with user's completed order history
     * @throws URISyntaxException
     * @throws IOException
     * @throws InterruptedException
     */
    public Map<String, List<Map<String,Object>>> userCompletedOrders(HttpServletRequest request) throws URISyntaxException, IOException, InterruptedException{
        Map<String, String> userInfo = findUserByAccessToken(request);
        if(userInfo == null){
            return null;
        }
        String email = userInfo.get("email");
        
        Integer customer_id = usersRepository.findByEmail(email).getUser_id();
        if(customer_id == null){
            return null;
        }
        
        Map<String, List<Map<String,Object>>> finalList = new HashMap<>();

        List<Map<String,Object>> completedOrders = ordersRepository.userCompletedOrders(customer_id);
        List<Map<String,Object>> completedList = new ArrayList<>();
        
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
            
            finalList.put("completed", completedList);
        }

        return finalList;
    }

    /**
     * Gets pending orders from database
     * @return JSON object containing all database pending orders
     */
    public  Map<String, List<Map<String, Object>>> pendingOrders(){
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
            orderMap.put("status", "Pending");
            finalPendingList.add(orderMap);
        }
        Map<String, List<Map<String, Object>>> result = new HashMap<>();
        result.put("pending", finalPendingList);

        return result;
    }

    /**
     * Gets completed orders from database
     * @return JSON Object containing completed order data from database
     */
    public  Map<String, List<Map<String, Object>>> completedOrders(){
        List<Map<String,Object>> completedOrders = ordersRepository.completedOrders();

        List<Map<String,Object>> finalCompletedList = new ArrayList<>();

        for(Map<String,Object> order : completedOrders){
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
            orderMap.put("status", (Boolean) orderMap.get("is_refunded") == true ? "Refunded" : "Completed");
            orderMap.put("items", itemList);
            finalCompletedList.add(orderMap);
        }
        Map<String, List<Map<String, Object>>> result = new HashMap<>();
        result.put("completed", finalCompletedList);

        return result;
    }

    /**
     * Gets next available order ID
     * @return Integer with next available order_id from database
     */
    public Integer maxOrder(){
        return ordersRepository.maxOrder();
    }

    /**
     * Marks order as completed
     * @param orderID order_id to identify order in database
     * @param refund Optional boolean check to define order as refunded / canceled
     */
    public void finishOrder(Integer orderID, Boolean refund){
        Orders order = ordersRepository.findById(orderID).get();
        order.setIs_pending(false);
        if(refund == true){
            order.setIs_refunded(true);
        }
        ordersRepository.save(order);
    }

    /**
     * Gets products and toppings from database
     * @return JSON Object containing product and toppings from database
     */
    public Map<String, Object> getAllProducts() {
        List<Product> products = productRepository.findByActive(true);
        List<Inventory> toppings = inventoryRepository.findToppings();

        Map<String, Object> productMap = new HashMap<>();
        productMap.put("products", products);

        productMap.put("toppings", toppings);

        return productMap;
    }

    /**
     * Gets best selling products
     * @return JSON Object with product data for the best selling products
     */
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

    /**
     * Gets category names from database
     * @return List of strings with category names 
     */
    public List<String> getCategories(){
        return categoryRepository.getCategoryNames();
    }

    /**
     * Adds a new category name to the database
     * @param categoryName String for new category name
     */
    public void addCategory(String categoryName){
        if(categoryRepository.findByName(categoryName) != null){
            return;
        }
        Category newCategory = new Category();
        newCategory.setName(categoryName);
        categoryRepository.save(newCategory);
    }

    /**
     * Deletes a category name and assigns products under that category to "Others"
     * @param categoryName Name of category to delete
     * @return
     */
    public String deleteCategory(String categoryName){
        Category del = categoryRepository.findById(categoryName).get();
        if(del == null){
            return "Error deleting " + categoryName;
        }
        if(categoryName.strip().equals("Others")){
            return "Can't delete Others";
        }

        List<Product> categoryProducts = productRepository.findAllByCategory(categoryName);
        for(Product p : categoryProducts){
            p.setCategory("Others");
        }
        productRepository.saveAll(categoryProducts);

        categoryRepository.delete(del);
        return "Deleted " + categoryName;
    }


    /**
     * Shows menu products and their sales between two dates
     * @param start Start date for data
     * @param end End date for data
     * @return JSON Object containing products and their sales
     */
    public List<Map<String, Object>> productSales(LocalDate start, LocalDate end){
        return productRepository.productSales(start, end);
    }

    /**
     * Shows most popular pairings for two products between two dates
     * @param start Start date for data
     * @param end End date for data
     * @return JSON Object showing quantity of pairings between two items 
     */
    public List<Map<String, Object>> commonPairs(LocalDate start, LocalDate end){
        return productRepository.commonPairings(start, end);
    }

    /**
     * Returns amount of individual inventory used between two dates
     * @param start Start date for data
     * @param end End date for data 
     * @return JSON Object containing all inventory names and their usage between dates 
     */
    public List<Map<String,Object>> inventoryUsage(LocalDate start, LocalDate end){
        return inventoryProductRepository.inventoryUsage(start, end);
    }

    /**
     * Updates a current product in the database
     * @param productID product_id from the database
     * @param name Optional new name to assign to the product in the database
     * @param category Optional new category to assign to the product in the database
     * @param price Optional new price to assign to the product in the database
     * @param weather Optional new weather match to assign to the product in the database
     * @param url Optional new image URL to assign to the product in the database
     * @return JSON object containing the product's updated body 
     */
    public Product updateProduct(Integer productID, String name, String category, Double price, String weather, String url) {
        Product product = productRepository.findById(productID).get();
        if(product == null){
            return null;
        }
        else{
            if(name != null){
                if(productRepository.findByName(name) == null){
                    product.setName(name);
                }
                else{
                    String activeCategory = product.getCategory();
                    if(category != null){
                        activeCategory = category;
                    }
                    Double activePrice = product.getPrice();
                    if(price != null){
                        activePrice = price;
                    }
                    String activeWeather = product.getWeather();
                    if(weather != null){
                        activeWeather = weather;
                    }
                    product.setActive(false);
                    productRepository.save(product);
                    addProduct(name, activeCategory, activePrice, activeWeather);
                }
            }
            if(name != null){
                product.setName(name);
            }
            if(category != null){
                product.setCategory(category);
            }
            if(price != null){
                product.setPrice(price);
            }
            if(weather != null){
                product.setWeather(weather.toLowerCase());
            }
            if(url != null){
                product.setUrl(url);
            }
            return productRepository.save(product);
        }
    }

    /**
     * Adds a new product to the database
     * @param name Name to assign to the new product
     * @param category Category to assign to the new product
     * @param price Price to assign to the new product
     * @param weather Optional weather match to assign to the new product
     * @return JSON Object with new / reactivated product body
     */
    public Product addProduct(String name, String category, Double price, String weather){
        Product product = productRepository.findByName(name);
        if(product != null){
            if(product.getActive() == true){
                return null;
            }
            product.setActive(true);
            if(category != null){
                product.setCategory(category);
            }
            if(price != null){
                product.setPrice(price);
            }
            if(weather != null){
                product.setWeather(weather);
            }
            productRepository.save(product);
            return product;
        }
        else{
            Product newProduct = new Product();
            newProduct.setName(name);
            newProduct.setCategory(category);
            newProduct.setPrice(price);
            if(weather != null){
                newProduct.setWeather(weather.toLowerCase());
            }
            productRepository.save(newProduct);
            return newProduct;
        }
    }

    /**
     * Deletes / deactivates a product in the database
     * @param productName name the product has in the database
     */
    public void deleteProduct(String productName){
        Product product = productRepository.findByName(productName);
        if(product == null){
            return;
        }
        product.setActive(false);
        productRepository.save(product);
    }

    /**
     * Gets active inventory items
     * @return JSON Object with inventory items and their details if they are active in the database
     */
    public List<Inventory> getAllInventory() {
        return inventoryRepository.findByActive(true);
    }

    /**
     * Updates details for inventory items in the database
     * @param inventoryId Inventory ID for item in the database
     * @param newName Name to assign to inventory item
     * @param quantity Stock quantity for item
     * @param isTopping Check to see if inventory item is a topping
     */
    public Inventory updateInventory(Integer inventoryId, String newName, Integer quantity, Boolean isTopping) {
        Inventory inventory = inventoryRepository.findById(inventoryId).get();
        if(inventory == null){
            return null;
        }
        else{
            if(quantity != null){
                inventory.setQuantity(quantity);
                inventory.setLast_updated(LocalDate.now());
            }
            if(isTopping != null){
                inventory.setIs_topping(isTopping);
            }
            if(newName != null){
                inventory.setName(newName);
            }
            return inventoryRepository.save(inventory);
        }
    }

    /**
     * Creates or re-activates inventory item in the database
     * @param inventoryName Name for new inventory item
     * @param quantity Quantity to assign to new inventory item
     */
    public Inventory addInventory(String newName, Integer quantity){
        Inventory inventory = inventoryRepository.findByName(newName);
        if(inventory != null){
            inventory.setActive(true);
            if(quantity != null){
                inventory.setQuantity(quantity);
                inventory.setLast_updated(LocalDate.now());
            }
            inventoryRepository.save(inventory);
            return inventory;
        }
        else{
            Inventory newInv = new Inventory();
            newInv.setName(newName);
            if(quantity != null){
                newInv.setQuantity(quantity);
            }
            inventoryRepository.save(newInv);
            return newInv;
        }
    }

    public String deleteInventory(Integer ID){
        Optional<Inventory> inventory = inventoryRepository.findById(ID);
        if(!inventory.isPresent()){
            return ("Could not find " + ID + " in the inventory list.");
        }
        Inventory presentInventory = inventory.get();
        presentInventory.setActive(false);
        inventoryRepository.save(presentInventory);
        return ("Deleted inventory#" + ID);
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
