/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteUser;

import com.strictit.catalogues.User.Users;
import com.strictit.catalogues.locations.Locations;

/**
 *
 * @author Nenad
 */
public class WasteUser {

    private WasteUserData wasteUserData;
    private Locations locations;
    private Users users;

    public WasteUser() {
        locations = new Locations();
        users = new Users();
    }

    public WasteUserData getWasteUserData() {
        return wasteUserData;
    }

    public void setWasteUserData(WasteUserData wasteUserData) {
        this.wasteUserData = wasteUserData;
    }

    public Locations getLocations() {
        return locations;
    }

    public void setLocations(Locations locations) {
        this.locations = locations;
    }

    public Users getUsers() {
        return users;
    }

    public void setUsers(Users users) {
        this.users = users;
    }

}
