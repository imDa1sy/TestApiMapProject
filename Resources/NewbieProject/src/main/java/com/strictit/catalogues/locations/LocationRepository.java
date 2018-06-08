/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.locations;


import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Nenad
 */  // @Query(value="{ 'firstname' : ?0 }", fields="{ 'firstname' : 1, 'lastname' : 1}")
@Repository
public interface LocationRepository extends MongoRepository<Location, String> {
    
       List<Location> findByActive(boolean active);
       @Query(value="{ 'active' : true }")
       List<Location> findActiveLocationsByWasteOwnerId(String wasteOwnerId);
       
       List<Location> findByWasteOwnerId(String wasteOwnerId);
       List<Location> findByWasteUserId(String wasteUserId);
}

