package com.sharetea.backend.RequestBodies;

import jakarta.validation.constraints.NotEmpty;

public class EmployeeBody {
    @NotEmpty private String firstName;
    @NotEmpty private String lastName;
    @NotEmpty private String email;
    @NotEmpty private String position;


    public String getFirstName() {
        return firstName;
    }
    public String getLastName() {
        return lastName;
    }
    public String getEmail() {
        return email;
    }
    public String getPosition() {
        return position;
    }
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public void setPosition(String position) {
        this.position = position;
    }

    
}
