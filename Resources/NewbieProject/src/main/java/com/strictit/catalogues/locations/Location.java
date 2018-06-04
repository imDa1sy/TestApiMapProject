/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.locations;

import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Nenad
 */
@Document(collection = "Locations")
public class Location {

    @Id
   private String myId;
    
    private String wasteOwnerId;
    private String wasteUserId;
    private int sortNum;
    private String description;
    private double latitude;
    private double longitude;

    public String getWasteUserId() {
        return wasteUserId;
    }

    public void setWasteUserId(String wasteUserId) {
        this.wasteUserId = wasteUserId;
    }

    public String getMyId() {
        return myId;
    }

    public void setMyId(String myId) {
        this.myId = myId;
    }

  

    @Override
    public String toString() {
        return "Location{" + "myId=" + myId + ", wasteOwnerId=" + wasteOwnerId + ", wasteUserId=" + wasteUserId + ", sortNum=" + sortNum + ", description=" + description + ", latitude=" + latitude + ", longitude=" + longitude + '}';
    }

   

    public String getWasteOwnerId() {
        return wasteOwnerId;
    }

    public void setWasteOwnerId(String wasteOwnerId) {
        this.wasteOwnerId = wasteOwnerId;
    }

    public int getSortNum() {
        return sortNum;
    }

    public void setSortNum(int sortNum) {
        this.sortNum = sortNum;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

   



}
