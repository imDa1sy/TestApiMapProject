/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Nenad
 */
@Document(collection = "WasteType")
public class WasteType {
    
    @Id
    private String id;
    
    private String name;
    private boolean active;
    private MultiLanguageDescription wasteType;
    private String color;
    private int factor;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public MultiLanguageDescription getWasteType() {
        return wasteType;
    }

    public void setWasteType(MultiLanguageDescription wasteType) {
        this.wasteType = wasteType;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getFactor() {
        return factor;
    }

    public void setFactor(int factor) {
        this.factor = factor;
    }

    @Override
    public String toString() {
        return "WasteType{" + "id=" + id + ", name=" + name + ", active=" + active + ", wasteType=" + wasteType + ", color=" + color + ", factor=" + factor + '}';
    }


  
    
}
