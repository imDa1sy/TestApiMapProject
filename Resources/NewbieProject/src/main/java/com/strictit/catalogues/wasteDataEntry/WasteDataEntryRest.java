/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteDataEntry;

import com.strictit.catalogues.locations.Location;
import com.strictit.catalogues.locations.LocationRepository;
import com.strictit.catalogues.wasteOwner.WasteOwnerData;
import com.strictit.catalogues.wasteOwner.WasteOwnerRepository;
import com.strictit.catalogues.wasteType.WasteType;
import com.strictit.catalogues.wasteType.WasteTypeRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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
 * @author daisy
 */
@RestController
@RequestMapping("/api")
@CrossOrigin("*")

public class WasteDataEntryRest {

    @Autowired
    WasteDataEntryRepository wasteDataEntryRepository;

    @Autowired
    WasteOwnerRepository wasteOwnerRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    WasteTypeRepository wasteTypeRepository;

    //======================= GET METHODS =====================================
    @GetMapping(path = "/getallwastedata")
    public List<WasteDataEntry> getAllWasteData() {
        List<WasteDataEntry> getTransationData
                = wasteDataEntryRepository.findAll();
        return getTransationData;
    }
      // method is returning list of waste data for specific waste owner
    @GetMapping(path = "/getallwastedatabyid/{wasteOwnerId}")
    public List<WasteData> getAllWasteDataById(@PathVariable String wasteOwnerId) {
        //add logic to get all waste data for current owner
        List wasteList = new ArrayList();

        //here we retreive listo of waste data by owner id then we loop through it 
        List<WasteDataEntry> listOfWasteDataEntrys = wasteDataEntryRepository.findByWasteOwnerId(wasteOwnerId);
        for (WasteDataEntry wasteDataEntry : listOfWasteDataEntrys) {
            WasteData localWasteData = new WasteData();
              //here waste data base information is set 
            localWasteData.setWasteDataEntry(wasteDataEntry);

            //here we retreive current waste owner information and add it to waste data object
            Optional<WasteOwnerData> wasteOwnerData = wasteOwnerRepository.findById(wasteDataEntry.getWasteOwnerId());
            localWasteData.setWasteOwnerData(wasteOwnerData);
            
            //here we retreive location of waste data and add it to waste data object
            Optional<Location> location = locationRepository.findById(wasteDataEntry.getWasteLocationId());
            //here we retreive waste type and add it to waste data object
            
            localWasteData.setLocation(location);
            Optional<WasteType> wasteType = wasteTypeRepository.findById(wasteDataEntry.getWasteTypeId());

            localWasteData.setWasteType(wasteType);
            //here waste object is populated and added to wasteList list to be sent

            wasteList.add(localWasteData);

        }
        return wasteList;
    }

    //method is returning all waste data from all waste owners
     @GetMapping(path = "/getallactivewastedata")
    public List<WasteData> getAllActiveWasteData() {
        //add logic to get all waste data for current owner
        List wasteList = new ArrayList();

        //here we retreive listo of waste data by owner id then we loop through it 
        List<WasteDataEntry> listOfWasteDataEntrys = wasteDataEntryRepository.findAll();
        for (WasteDataEntry wasteDataEntry : listOfWasteDataEntrys) {
            WasteData localWasteData = new WasteData();
              //here waste data base information is set 
            localWasteData.setWasteDataEntry(wasteDataEntry);

            //here we retreive current waste owner information and add it to waste data object
            Optional<WasteOwnerData> wasteOwnerData = wasteOwnerRepository.findById(wasteDataEntry.getWasteOwnerId());
            localWasteData.setWasteOwnerData(wasteOwnerData);
            
            //here we retreive location of waste data and add it to waste data object
            Optional<Location> location = locationRepository.findById(wasteDataEntry.getWasteLocationId());
            //here we retreive waste type and add it to waste data object
            
            localWasteData.setLocation(location);
            Optional<WasteType> wasteType = wasteTypeRepository.findById(wasteDataEntry.getWasteTypeId());

            localWasteData.setWasteType(wasteType);
            //here waste object is populated and added to wasteList list to be sent

            wasteList.add(localWasteData);

        }
        return wasteList;
    }
    
    @GetMapping(path = "/getwastedatabyid/{id}")
    public ResponseEntity getWasteById(@PathVariable String id) {
        return wasteDataEntryRepository.findById(id).map(oneTransation
                -> ResponseEntity.ok().body(oneTransation))
                .orElse(ResponseEntity.notFound().build());

    }

    //========================= UPDATE METHODS ====================================
    @PutMapping(path = "/updatewastedata/{id}")
    public ResponseEntity updateWasteData(@PathVariable String id, @RequestBody WasteDataEntry wd) {
        if (id.equalsIgnoreCase("null")) {

            WasteDataEntry wasteDatEntryInserted = wasteDataEntryRepository.save(wd);
            System.out.println("after insert");
            return ResponseEntity.ok().body(wasteDatEntryInserted);

        } else {

            return wasteDataEntryRepository.findById(id).map(updateData -> {
                updateData = wd;
                WasteDataEntry wasteDataUpdated = wasteDataEntryRepository.save(updateData);
                System.out.println("Waste data with id=' " + updateData.getId() + "' updated!");

                return ResponseEntity.ok().body(wasteDataUpdated);

            }).orElse(ResponseEntity.notFound().build());
        }
    }

    //========================= DELETE METHODS ===================================
    @DeleteMapping(path = "/removewastedata/{id}")
    public ResponseEntity removeWasteData(@PathVariable String id) {
        return wasteDataEntryRepository.findById(id).map(deleteData -> {
            deleteData.setExpired(true);
            wasteDataEntryRepository.save(deleteData);
            System.out.println("Removed waste data with type= '" + deleteData.getId() + "' deleted!");
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
