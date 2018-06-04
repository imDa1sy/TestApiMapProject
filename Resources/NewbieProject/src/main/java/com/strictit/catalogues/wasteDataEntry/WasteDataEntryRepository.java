/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteDataEntry;

import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author daisy
 */
public interface WasteDataEntryRepository extends MongoRepository<WasteDataEntry, String> {

}
