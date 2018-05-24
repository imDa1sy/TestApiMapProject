/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.biomassType;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Nenad
 */
public interface BiomassTypeRepository extends MongoRepository<BiomassType,String> {
    
}
