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
    private String wasteOwnerId;
    private String wasteLocationId;
    private String wasteTypeId;
    private double amount;
    private Date wasteDataSubmited;
    private Date validityDateStart;
    private Date validityDateEnd;
    private boolean expired;

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

    public String getWasteLocationId() {
        return wasteLocationId;
    }

    public void setWasteLocationId(String wasteLocationId) {
        this.wasteLocationId = wasteLocationId;
    }

    public String getWasteTypeId() {
        return wasteTypeId;
    }

    public void setWasteTypeId(String wasteTypeId) {
        this.wasteTypeId = wasteTypeId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getWasteDataSubmited() {
        return wasteDataSubmited;
    }

    public void setWasteDataSubmited(Date wasteDataSubmited) {
        this.wasteDataSubmited = wasteDataSubmited;
    }

    public Date getValidityDateStart() {
        return validityDateStart;
    }

    public void setValidityDateStart(Date validityDateStart) {
        this.validityDateStart = validityDateStart;
    }

    public Date getValidityDateEnd() {
        return validityDateEnd;
    }

    public void setValidityDateEnd(Date validityDateEnd) {
        this.validityDateEnd = validityDateEnd;
    }

    public boolean isExpired() {
        return expired;
    }

    public void setExpired(boolean expired) {
        this.expired = expired;
    }

    @Override
    public String toString() {
        return "WasteDataEntry{" + "id=" + id + ", wasteOwnerId=" + wasteOwnerId + ", wasteLocationId=" + wasteLocationId + ", wasteTypeId=" + wasteTypeId + ", amount=" + amount + ", wasteDataSubmited=" + wasteDataSubmited + ", validityDateStart=" + validityDateStart + ", validityDateEnd=" + validityDateEnd + ", expired=" + expired + '}';
    }

    
}
