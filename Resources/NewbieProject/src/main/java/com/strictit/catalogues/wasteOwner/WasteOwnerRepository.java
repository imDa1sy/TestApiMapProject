/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteOwner;

import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Nenad
 */
public interface WasteOwnerRepository extends MongoRepository<WasteOwnerData, String> {
         List<WasteOwnerData> findByActive(boolean active);
}
