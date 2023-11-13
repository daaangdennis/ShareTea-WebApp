package com.sharetea.backend.RequestBodies;

import jakarta.validation.constraints.NotEmpty;

public class CustomerBody {
    private String firstName;
    private String lastName;
    @NotEmpty private String email;


    public CustomerBody(String firstName, String lastName, @NotEmpty String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }
    
    public String getFirstName() {
        return firstName;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    
}
