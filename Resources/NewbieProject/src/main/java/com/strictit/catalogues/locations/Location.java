/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.locations;

import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Nenad
 */
@Document(collection = "Locations")
public class Location {

    @Id
    private String id;
    
    private String wasteOwnerId;
    private String wasteUserId;
    private int sortNum;
    private String description;
    private String latitude;
    private String longitude;

    public String getWasteUserId() {
        return wasteUserId;
    }

    public void setWasteUserId(String wasteUserId) {
        this.wasteUserId = wasteUserId;
    }

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

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    @Override
    public String toString() {
        return "Location{" + "id=" + id + ", wasteOwnerId=" + wasteOwnerId + ", sortNum=" + sortNum + ", description=" + description + ", latitude=" + latitude + ", longitude=" + longitude + '}';
    }

}
