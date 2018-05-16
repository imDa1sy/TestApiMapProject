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
    private String Id;
    private String LocationString;
    private double Mass;
    private String BiomassTypeString;
    private String ownerId;
    private String ownerName;
    private Date OutputDate;

    public String getId() {
        return Id;
    }
  
    public void setId(String Id) {
        this.Id = Id;
    }

    public String getLocationString() {
        return LocationString;
    }

    public void setLocationString(String LocationString) {
        this.LocationString = LocationString;
    }

    public double getMass() {
        return Mass;
    }

    public void setMass(double Mass) {
        this.Mass = Mass;
    }

    public String getBiomassTypeString() {
        return BiomassTypeString;
    }

    public void setBiomassTypeString(String BiomassTypeString) {
        this.BiomassTypeString = BiomassTypeString;
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
        return OutputDate;
    }

    public void setOutputDate(Date OutputDate) {
        this.OutputDate = OutputDate;
    }

    @Override
    public String toString() 
    {
        return "Biowaste_transation_data{" + "Id=" + Id + ", LocationString=" + 
                LocationString + ", Mass=" + Mass + ", BiomassTypeString=" + 
                BiomassTypeString + ", ownerId=" + ownerId + ", ownerName=" + 
                ownerName + ", OutputDate=" + OutputDate + '}';
    }
     
}
