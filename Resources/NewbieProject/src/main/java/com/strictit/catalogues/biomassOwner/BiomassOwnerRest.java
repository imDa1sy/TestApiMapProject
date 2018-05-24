/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.biomassOwner;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nenad
 */
@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class BiomassOwnerRest {

    @Autowired
    BiomassOwnerRepository biomassOwnerRepository;

    //========================= GET METHODS ====================================
    @GetMapping(path = "/getallbiomassowners")
    public List<BiomassOwner> getAllBiomassOwners() {
        
        List<BiomassOwner> biomassOwnerList = biomassOwnerRepository.findAll();
        
        return biomassOwnerList;
    }

    @GetMapping(path = "/getbiomassownerbyid/{id}")
    public ResponseEntity getBiomassOwnerById(@PathVariable String id) {

        System.out.println(biomassOwnerRepository.findById(id));

        return biomassOwnerRepository.findById(id)
                .map(oneOwner -> ResponseEntity.ok().body(oneOwner))
                .orElse(ResponseEntity.notFound().build());

    }

    //======================== POST METHODS ====================================
    @PostMapping("/insertbiomassowner")
    public BiomassOwner insertBiomassOwner(@RequestBody BiomassOwner bmo) {
        System.out.println("Biomass Owner Inserted!");
        return biomassOwnerRepository.save(bmo);
    }

    //======================= UPDATE METHODS ===================================
    @PutMapping(path = "/updatebiomassowner/{id}")
    public ResponseEntity updateBiomassOwner(@PathVariable String id, @RequestBody BiomassOwner bmo) {

        return biomassOwnerRepository.findById(id)
                .map(updateData -> {

                    updateData.setFirstName(bmo.getFirstName());
                    updateData.setLastName(bmo.getLastName());
                    updateData.setLocation(bmo.getLocation());
                    updateData.setContact(bmo.getContact());
                    updateData.setBiowasteTypeOutput(bmo.getBiowasteTypeOutput());

                    BiomassOwner biomassOwnerUpdated = biomassOwnerRepository.save(updateData);
                    System.out.println("Biomass owner with id=' " + updateData.getId() + "' updated!");

                    return ResponseEntity.ok().body(biomassOwnerUpdated);
                }).orElse(ResponseEntity.notFound().build());
    }

    //========================== DELETE METHODS ==================================
    @DeleteMapping(path = "/removebiomassowner/{id}")
    @ResponseBody
    public ResponseEntity<?> removeBiomassOwner(@PathVariable String id) {

        return biomassOwnerRepository.findById(id)
                .map(deletedOwner -> {

                    biomassOwnerRepository.deleteById(id);
                    System.out.println("Removed biomass Owner '" + deletedOwner.getFirstName() + "' deleted!");
                    return ResponseEntity.ok().body(deletedOwner.getId());

                }).orElse(ResponseEntity.notFound().build());

    }
}
