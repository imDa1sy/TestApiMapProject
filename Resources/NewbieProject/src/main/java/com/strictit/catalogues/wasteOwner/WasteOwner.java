/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteOwner;

import com.strictit.catalogues.User.Users;

import com.strictit.catalogues.locations.Locations;


/**
 *
 * @author Nenad
 */
public class WasteOwner {

    private WasteOwnerData wasteOwnerData;
    private Locations locations;
    private Users users;

    public WasteOwner() {
        locations = new Locations();
        users = new Users();
    }

    public WasteOwnerData getWasteOwnerData() {
        return wasteOwnerData;
    }

    public void setWasteOwnerData(WasteOwnerData wasteOwnerData) {
        this.wasteOwnerData = wasteOwnerData;
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
