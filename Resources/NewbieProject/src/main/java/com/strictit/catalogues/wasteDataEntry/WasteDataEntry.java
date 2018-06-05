/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteDataEntry;

import java.util.Date;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Nenad
 */
@Document(collection = "WasteData")

public class WasteDataEntry {

    @Id
    private String id;
    private String wasteOwner;
    private String wasteLocation;
    private String wasteType;
    private double amount;
    private Date validityDate;
    private Date planedWasteDate;
    private boolean expired;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getWasteOwner() {
        return wasteOwner;
    }

    public void setWasteOwner(String wasteOwner) {
        this.wasteOwner = wasteOwner;
    }

    public String getWasteLocation() {
        return wasteLocation;
    }

    public void setWasteLocation(String wasteLocation) {
        this.wasteLocation = wasteLocation;
    }

    public String getWasteType() {
        return wasteType;
    }

    public void setWasteType(String wasteType) {
        this.wasteType = wasteType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getValidityDate() {
        return validityDate;
    }

    public void setValidityDate(Date validityDate) {
        this.validityDate = validityDate;
    }

    public Date getPlanedWasteDate() {
        return planedWasteDate;
    }

    public void setPlanedWasteDate(Date planedWasteDate) {
        this.planedWasteDate = planedWasteDate;
    }

    public boolean isExpired() {
        return expired;
    }

    public void setExpired(boolean expired) {
        this.expired = expired;
    }

    @Override
    public String toString() {
        return "WasteData{" + "id=" + id + ", wasteOwner=" + wasteOwner + ", wasteLocation=" + wasteLocation + ", wasteType=" + wasteType + ", amount=" + amount + ", validityDate=" + validityDate + ", planedWasteDate=" + planedWasteDate + ", expired=" + expired + '}';
    }

}
