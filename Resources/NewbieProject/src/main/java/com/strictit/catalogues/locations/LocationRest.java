/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.locations;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nenad
 */
@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class LocationRest {

        @Autowired
        LocationRepository locationRepository;

//=========================== GET METHODS ======================================
        @GetMapping(path = "/getalllocations")
        public List<Location> getAllLocations() {

            List<Location> locationList = locationRepository.findAll();

            return locationList;
        }

        @GetMapping(path = "/getlocationbyid/{id}")
        public List<Location> getLocationById(@PathVariable String id) {
            List<Location> locationsList = locationRepository.findByWasteOwnerId(id);
           
                    return locationsList;
                   
        }

     


//========================== UPDATE METHODS ====================================
      /*  @PutMapping(path = "/updatelocation/{id}")
        public ResponseEntity updateLocation(@PathVariable String id, @RequestBody Location location) {

            return locationRepository.findById(id).map(updateData -> {
                updateData.setDescription(location.getDescription());
                updateData.setLatitude(location.getLatitude());
                updateData.setLongitude(location.getLongitude());

                Location updatedLocation = locationRepository.save(updateData);
                System.out.println("Location with id=' " + updateData.getId() + "' updated!");

                return ResponseEntity.ok().body(updatedLocation);
            }).orElse(ResponseEntity.notFound().build());

        }
*/
//========================== DELETE METHODS ====================================    
        @DeleteMapping(path = "/removelocation/{id}")
        public ResponseEntity removeLocation(@PathVariable String id) {

            return locationRepository.findById(id).map(deleteLocation -> {

                locationRepository.deleteById(id);
                System.out.println("Location  deleted!");

                return ResponseEntity.ok().build();
            }).orElse(ResponseEntity.notFound().build());
        }
    }
