/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.biowaste_transation_data;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
biowasteTransationDataRepository biowasteDataRepository;
    @GetMapping(path = "/getAllTansationData")
    public List<Biowaste_transation_data> getAllTransationData() {
        List <Biowaste_transation_data> getTransationData =  
                biowasteDataRepository.findAll();
        return getTransationData;
    }

}
