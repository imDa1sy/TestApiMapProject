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

    //========================= POST METHODS ====================================
    @PostMapping(path = "/insertwastedata")
    public WasteDataEntry insertWasteData(@RequestBody WasteDataEntry wd) {

        System.out.println("Waste data inserted!");

        return wasteDataEntryRepository.save(wd);
    }

    //========================= UPDATE METHODS ====================================
    @PutMapping(path = "/updatewastedata/{id}")
    public ResponseEntity updateWasteData(@PathVariable String id, @RequestBody WasteDataEntry wd) {

        return wasteDataEntryRepository.findById(id).map(updateData -> {

            updateData.setWasteOwner(wd.getWasteOwner());
            updateData.setWasteLocation(wd.getWasteLocation());
            updateData.setAmount(wd.getAmount());
            updateData.setWasteType(wd.getWasteType());
            updateData.setValidityDate(wd.getValidityDate());
            updateData.setPlanedWasteDate(wd.getPlanedWasteDate());
            updateData.setExpired(wd.isExpired());

            System.out.println("waste data with id=' " + updateData.getId() + "' updated!");
            WasteDataEntry wdupdated = wasteDataEntryRepository.save(updateData);
            return ResponseEntity.ok().body(wdupdated);
        }).orElse(ResponseEntity.notFound().build());
    }

    //========================= DELETE METHODS ===================================
    @DeleteMapping(path = "/removewastedata/{id}")
    public ResponseEntity removeWasteData(@PathVariable String id) {
        return wasteDataEntryRepository.findById(id).map(deleteData -> {

            wasteDataEntryRepository.deleteById(id);
            System.out.println("Removed waste data with type= '" + deleteData.getId() + "' deleted!");
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
