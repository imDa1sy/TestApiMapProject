/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.User;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Nenad
 */
@Document(collection = "Users")
public class User {

    @Id
    private String id;
    private String wasteOwnerId;
    private String wasteUserId;
    private String role;
    private String userName;
    private String password;
    private boolean authenticated;

 
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWasteOwnerId() {
        return wasteOwnerId;
    }

    public void setWasteOwnerId(String wasteOwnerId) {
        this.wasteOwnerId = wasteOwnerId;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getWasteUserId() {
        return wasteUserId;
    }

    public void setWasteUserId(String wasteUserId) {
        this.wasteUserId = wasteUserId;
    }

    public boolean isAuthenticated() {
        return authenticated;
    }

    public void setAuthenticated(boolean authenticated) {
        this.authenticated = authenticated;
    }

    @Override
    public String toString() {
        return "User{" + "id=" + id + ", wasteOwnerId=" + wasteOwnerId + ", wasteUserId=" + wasteUserId + ", role=" + role + ", userName=" + userName + ", password=" + password + '}';
    }

  

}
