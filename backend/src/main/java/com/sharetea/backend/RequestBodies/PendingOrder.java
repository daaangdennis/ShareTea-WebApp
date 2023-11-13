package com.sharetea.backend.RequestBodies;

import java.time.LocalDateTime;

public class PendingOrder {
    private Integer ID;
    private LocalDateTime Date;
    private String firstName;
    private String lastName;

    public PendingOrder(Integer iD, LocalDateTime date, String firstName, String lastName) {
        ID = iD;
        Date = date;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public Integer getID() {
        return ID;
    }
    public void setID(Integer iD) {
        ID = iD;
    }
    public LocalDateTime getDate() {
        return Date;
    }
    public void setDate(LocalDateTime date) {
        Date = date;
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

    
}
