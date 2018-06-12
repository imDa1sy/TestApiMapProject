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

    @GetMapping(path = "/getallactivelocations")
    public List<Location> getAllActiveLocations() {
        boolean active = true;
        List<Location> locationList = locationRepository.findByActive(active);

        return locationList;
    }

    @GetMapping(path = "/getallactivelocationsbywasteownerid/{wasteOwnerId}")
    public List<Location> getAllActiveLocations(@PathVariable String wasteOwnerId) {

        boolean active = true;
        List<Location> listOfActiveLocations = locationRepository.findByWasteOwnerIdAndActive(wasteOwnerId, active);
        return listOfActiveLocations;
    }

    @GetMapping(path = "/getlocationbyid/{id}")
    public List<Location> getLocationById(@PathVariable String id) {
        List<Location> locationsList = locationRepository.findByWasteOwnerId(id);

        return locationsList;

    }

//========================== DELETE METHODS ====================================    
    @DeleteMapping(path = "/removelocation/{id}")
    public ResponseEntity removeLocation(@PathVariable String id) {

        return locationRepository.findById(id).map(deleteLocation -> {
            deleteLocation.setActive(false);
            locationRepository.save(deleteLocation);
            System.out.println("Location  deleted!");

            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
