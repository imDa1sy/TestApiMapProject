/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteDataEntry;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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

    //======================= GET METHODS =====================================
    @GetMapping(path = "/getallwastedata")
    public List<WasteDataEntry> getAllWasteData() {
        List<WasteDataEntry> getTransationData
                = wasteDataEntryRepository.findAll();
        return getTransationData;
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
