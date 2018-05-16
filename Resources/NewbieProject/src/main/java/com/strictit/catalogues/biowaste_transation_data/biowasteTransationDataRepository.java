/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.biowaste_transation_data;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author daisy
 */

public interface biowasteTransationDataRepository extends MongoRepository
        <Biowaste_transation_data, String>
{
    
}
