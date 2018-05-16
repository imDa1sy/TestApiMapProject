/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.biowaste_transation_data;

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

public class BiowasteTansationDataRest {

    @Autowired
    biowasteTransationDataRepository biowasteTransationDataRepository;

    //======================= GET METHODS =====================================
    @GetMapping(path = "/getalltansationdata")
    public List<Biowaste_transation_data> getAllTransationData() {
        List<Biowaste_transation_data> getTransationData
                = biowasteTransationDataRepository.findAll();
        return getTransationData;
    }

    @GetMapping(path = "/gettransationdatabyid/{id}")
    public ResponseEntity getTransationById(@PathVariable String id) {
        return biowasteTransationDataRepository.findById(id).map(oneTransation
                -> ResponseEntity.ok().body(oneTransation))
                .orElse(ResponseEntity.notFound().build());

    }

    //========================= POST METHODS ====================================
    @PostMapping(path = "/inserttransationdata")
    public Biowaste_transation_data insertTransationData(@RequestBody Biowaste_transation_data btd) {

        System.out.println("Biowaste transation inserted!");

        return biowasteTransationDataRepository.save(btd);
    }

    //========================= UPDATE METHODS ====================================
    @PutMapping(path = "/updatetransationdata/{id}")
    public ResponseEntity updateTransationData(@PathVariable String id, @RequestBody Biowaste_transation_data btd) {

        return biowasteTransationDataRepository.findById(id).map(updateData -> {

            updateData.setLocationString(btd.getLocationString());
            updateData.setMass(btd.getMass());
            updateData.setOwnerId(btd.getOwnerId());
            updateData.setOwnerName(btd.getOwnerName());
            updateData.setOutputDate(btd.getOutputDate());

            System.out.println("Biomass transation with id=' " + updateData.getId() + "' updated!");
            Biowaste_transation_data btdupdated = biowasteTransationDataRepository.save(updateData);
            return ResponseEntity.ok().body(btdupdated);
        }).orElse(ResponseEntity.notFound().build());
    }

    //========================= DELETE METHODS ===================================
    @DeleteMapping(path = "/removetransationdata/{id}")
    public ResponseEntity removeTransationData(@PathVariable String id) {
        return biowasteTransationDataRepository.findById(id).map(deleteData -> {

            biowasteTransationDataRepository.deleteById(id);
            System.out.println("Removed Biomass transation data with type= '" + deleteData.getId() + "' deleted!");
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
