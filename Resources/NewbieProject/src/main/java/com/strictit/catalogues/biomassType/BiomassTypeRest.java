/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.biomassType;

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
 * @author Nenad
 */
@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class BiomassTypeRest {

    @Autowired
    BiomassTypeRepository biomassTypeRepository;

    //=========================== GET METHODS ==================================
    @GetMapping(path = "/getallbiomasstypes")
    public List<BiomassType> getAllBiomassTypes() {
        
      List<BiomassType> biomassTypeList = biomassTypeRepository.findAll();
      
        return biomassTypeList;
    }

    @GetMapping(path = "/getbiomasstypebyid/{id}")
    public ResponseEntity getBiomassTypeById(@PathVariable String id) {

        return biomassTypeRepository.findById(id).map(oneType
                -> ResponseEntity.ok().body(oneType))
                .orElse(ResponseEntity.notFound().build());
    }

    //========================= INSERT METHODS =================================
    @PostMapping(path = "/insertbiomasstype")
    public BiomassType insertBioMassType(@RequestBody BiomassType bmt) {

        System.out.println("Biomass type inserted!");

        return biomassTypeRepository.save(bmt);
    }

    //========================= UPDATE METHODS =================================
    @PutMapping(path = "/updatebiomasstype/{id}")
    public ResponseEntity updateBiomassType(@PathVariable String id, @RequestBody BiomassType bmt) {

        return biomassTypeRepository.findById(id).map(updateData -> {
            updateData.setBiomassType(bmt.getBiomassType());
            BiomassType biomassTypeUpdated = biomassTypeRepository.save(updateData);
            System.out.println("Biomass type with id=' " + updateData.getId() + "' updated!");

            return ResponseEntity.ok().body(biomassTypeUpdated);

        }).orElse(ResponseEntity.notFound().build());
    }

    //========================== DELETE METHODS ================================
    @DeleteMapping(path = "/removebiomasstype/{id}")
    public ResponseEntity removeBiomassType(@PathVariable String id) {
      
        return biomassTypeRepository.findById(id).map(deleteType -> {

            biomassTypeRepository.deleteById(id);
            System.out.println("Removed Biomass Type with type= '" + deleteType.getBiomassType() + "' deleted!");
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
