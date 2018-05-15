/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.biomassType;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Nenad
 */
@Document(collection = "BiomassType")
public class BiomassType {
    
    @Id
    private String id;
    
    private String biomassType;

    public String getId() {
        return id;
    }

    public void setId(String _id) {
        this.id = _id;
    }

    public String getBiomassType() {
        return biomassType;
    }

    public void setBiomassType(String BiomassType) {
        this.biomassType = BiomassType;
    }

    @Override
    public String toString() {
        return "BiomassType{" + "_id=" + id + ", BiomassType=" + biomassType + '}';
    }
    
}
