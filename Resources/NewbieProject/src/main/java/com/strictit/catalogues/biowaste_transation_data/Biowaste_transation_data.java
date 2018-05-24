/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.biowaste_transation_data;

import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


/**
 *
 * @author Nenad
 */

@Document(collection = "BiowasteDataInput")

public class Biowaste_transation_data 

{ 
    @Id 
    private String id;
    private String locationString;
    private double mass;
    private String biomassTypeString;
    private String ownerId;
    private String ownerName;
    private Date outputDate;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLocationString() {
        return locationString;
    }

    public void setLocationString(String locationString) {
        this.locationString = locationString;
    }

    public double getMass() {
        return mass;
    }

    public void setMass(double mass) {
        this.mass = mass;
    }

    public String getBiomassTypeString() {
        return biomassTypeString;
    }

    public void setBiomassTypeString(String biomassTypeString) {
        this.biomassTypeString = biomassTypeString;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public Date getOutputDate() {
        return outputDate;
    }

    public void setOutputDate(Date outputDate) {
        this.outputDate = outputDate;
    }

    @Override
    public String toString() {
        return "Biowaste_transation_data{" + "id=" + id + ", locationString=" + locationString +
                ", mass=" + mass + ", biomassTypeString=" + biomassTypeString + 
                ", ownerId=" + ownerId + ", ownerName=" + ownerName +
                ", outputDate=" + outputDate + '}';
    }

     
}
