package com.sharetea.backend.RequestBodies;

import jakarta.validation.constraints.NotEmpty;

public class CustomerBody {
    @NotEmpty private String firstName;
    @NotEmpty private String lastName;
    @NotEmpty private String tokenID;
    @NotEmpty private String email;


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
    public String getTokenID() {
        return tokenID;
    }
    public void setTokenID(String tokenID) {
        this.tokenID = tokenID;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    
}
