/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteType;

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
public class WasteTypeRest {
    
    @Autowired
    WasteTypeRepository wasteTypeRepository;

    //=========================== GET METHODS ==================================
    @GetMapping(path = "/getallwastetypes")
    public List<WasteType> getAllWasteTypes() {
        
        List<WasteType> wasteTypeList = wasteTypeRepository.findAll();
        
        return wasteTypeList;
    }
    
    @GetMapping(path = "/getallactivewastetypes")
    public List<WasteType> getAllActiveWasteTypes() {
        boolean active = true;
        List<WasteType> listOfActiveWasteTypes = wasteTypeRepository.findByActive(active);
        return listOfActiveWasteTypes;
    }
    
    @GetMapping(path = "/getwastetypebyid/{id}")
    public ResponseEntity getWasteTypeById(@PathVariable String id) {
        
        return wasteTypeRepository.findById(id).map(oneType
                -> ResponseEntity.ok().body(oneType))
                .orElse(ResponseEntity.notFound().build());
    }

    //========================= UPDATE-INSERT METHODS =================================
    @PutMapping(path = "/updatewastetype/{id}")
    public ResponseEntity<WasteType> updateWasteType(@PathVariable String id, @RequestBody WasteType wt) {
        if (id.equalsIgnoreCase("null")) {
            WasteType wasteTypeInserted = wasteTypeRepository.save(wt);
            System.out.println("after insert");
            return ResponseEntity.ok().body(wasteTypeInserted);
        } else {
            return wasteTypeRepository.findById(id).map(updateData -> {
                updateData = wt;
                WasteType wasteTypeUpdated = wasteTypeRepository.save(updateData);
                System.out.println("Waste type with id=' " + updateData.getId() + "' updated!");
                
                return ResponseEntity.ok().body(wasteTypeUpdated);
                
            }).orElse(ResponseEntity.notFound().build());
        }
    }

    //========================== DELETE METHODS ================================
    @DeleteMapping(path = "/removewastetype/{id}")
    public ResponseEntity removeWasteType(@PathVariable String id) {
        
        return wasteTypeRepository.findById(id).map(deleteType -> {
            deleteType.setActive(false);
            wasteTypeRepository.save(deleteType);
            System.out.println("Removed Waste Type with type= '" + deleteType.getWasteType() + "' deleted!");
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
