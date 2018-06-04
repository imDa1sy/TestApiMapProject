/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteOwner;

import com.strictit.catalogues.User.User;
import com.strictit.catalogues.User.UserRepository;
import com.strictit.catalogues.locations.Location;
import com.strictit.catalogues.locations.LocationRepository;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Nenad
 */
@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class WasteOwnerRest {

    @Autowired
    WasteOwnerRepository wasteOwnerRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    UserRepository userRepository;

    //========================= GET METHODS ====================================
    @GetMapping(path = "/getallwasteowners")
    public List<WasteOwnerData> getAllWasteOwners() {

        List<WasteOwnerData> wasteOwnerList = wasteOwnerRepository.findAll();

        return wasteOwnerList;
    }

    @GetMapping(path = "/getwasteownerbyid/{id}")
    public ResponseEntity getWasteOwnerById(@PathVariable String id) {

        WasteOwner wasteOwner = new WasteOwner();
        Optional<WasteOwnerData> wasteOwnerData = wasteOwnerRepository.findById(id);
        //TODO if not found then return ResponseEntity not found!
        wasteOwner.setWasteOwnerData(wasteOwnerData.orElse(new WasteOwnerData()));
        // Load all locations from database by owner id
        wasteOwner.getLocations().loadByWasteOwnerId(id);
        wasteOwner.getUsers().loadByWasteOwnerId(id);
        return ResponseEntity.ok().body(wasteOwner);

    }

    //======================= UPDATE-INSERT METHODS ===================================
    @PutMapping(path = "/updatewasteowner/{id}")
    public ResponseEntity updateWasteOwner(@PathVariable String id, @RequestBody WasteOwner wob) {

        if (id.equalsIgnoreCase("null")) {
            WasteOwnerData wasteOwnerDataInserted = wasteOwnerRepository.save(wob.getWasteOwnerData());

            for (Location loc : wob.getLocations()) {
                loc.setWasteOwnerId(wasteOwnerDataInserted.getId());
                locationRepository.save(loc);
            }

            for (User user : wob.getUsers()) {
                user.setWasteOwnerId(wasteOwnerDataInserted.getId());
                userRepository.save(user);
            }

            return ResponseEntity.ok().body(wasteOwnerDataInserted);
        } else {
            wasteOwnerRepository.findById(id)
                    .map(updateData -> {
                        updateData = wob.getWasteOwnerData();
                        WasteOwnerData wasteOwnerUpdated = wasteOwnerRepository.save(updateData);
                        return ResponseEntity.ok().body(wasteOwnerUpdated);
                    });
            //   List<Location> retreivedLocations= locationRepository.findByWasteOwnerId(id);

            for (Location location : wob.getLocations()) {
                locationRepository.findById(location.getId()).map(locationUpdate -> {
                    locationUpdate = location;
                     locationRepository.save(locationUpdate);
                    return ResponseEntity.ok().body(locationUpdate);
                });

            }
            for (User user : wob.getUsers()) {
                userRepository.findById(user.getId()).map(userUpdate -> {
                    userUpdate = user;
                    userRepository.save(userUpdate);
                     return ResponseEntity.ok().body(userUpdate);
                });

            }
        }
        return null;
    }

    //========================== DELETE METHODS ==================================
    @DeleteMapping(path = "/removewasteowner/{id}")
    @ResponseBody
    public ResponseEntity<?> removeWasteOwner(@PathVariable String id) {

        return wasteOwnerRepository.findById(id)
                .map(deletedOwner -> {

                    wasteOwnerRepository.deleteById(id);
                    //    System.out.println("Removed waste Owner '" + deletedOwner.getName() + "' deleted!");
                    return ResponseEntity.ok().body(deletedOwner.getId());

                }).orElse(ResponseEntity.notFound().build());

    }
}
