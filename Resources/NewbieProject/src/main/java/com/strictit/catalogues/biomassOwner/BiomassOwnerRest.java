/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.biomassOwner;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
public class BiomassOwnerRest {
    @Autowired
    BiomassOwnerRepository biomassOwnerRepository;
    //========================= GET METHODS ====================================
    @CrossOrigin("*")
    @GetMapping("/getbiomassowner")
    @ResponseBody
    public ResponseEntity getBiomassOwner(){
        
        return new ResponseEntity(HttpStatus.OK);
    }
    
    //======================== POST METHODS ====================================
    
    @CrossOrigin("*")
    @PostMapping("/insertbiomassowner")
    @ResponseBody
    public ResponseEntity insertBiomassOwner(@RequestBody BiomassOwner bmo){
        Contact bmoContact = new Contact();
        bmoContact.setNumber1(0);
        bmoContact.setNumber2(0);
        bmoContact.setOwnerEmail("ownerEmail");
        bmo.setContact(bmoContact);
        return new ResponseEntity(HttpStatus.CREATED);
    }
}
