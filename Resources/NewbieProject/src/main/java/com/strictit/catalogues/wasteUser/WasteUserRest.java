/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteUser;

import com.strictit.catalogues.User.PasswordHash;
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
public class WasteUserRest {

    @Autowired
    WasteUserRepository wasteUserRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    PasswordHash PasswordHash;

    //========================= GET METHODS ====================================
    @GetMapping(path = "/getallwasteusers")
    public List<WasteUserData> getAllWasteUser() {

        List<WasteUserData> wasteUserList = wasteUserRepository.findAll();

        return wasteUserList;
    }

    @GetMapping(path = "/getwasteuserbyid/{id}")
    public ResponseEntity getWasteUserById(@PathVariable String id) {

        WasteUser wasteUser = new WasteUser();
        Optional<WasteUserData> wasteUserData = wasteUserRepository.findById(id);
        //TODO if not found then return ResponseEntity not found!
        wasteUser.setWasteUserData(wasteUserData.orElse(new WasteUserData()));
        // Load all locations from database by owner id
        wasteUser.getLocations().loadByWasteUserId(id);
        wasteUser.getUsers().loadByWasteUserId(id);
        return ResponseEntity.ok().body(wasteUser);
    }

    //======================= UPDATE-INSERT METHODS ===================================
    @PutMapping(path = "/updatewasteuser/{id}")
    public ResponseEntity updateWasteUser(@PathVariable String id, @RequestBody WasteUser wu) {
        if (id.equalsIgnoreCase("null")) {
            WasteUserData wasteUserDataInserted = wasteUserRepository.save(wu.getWasteUserData());

            for (Location loc : wu.getLocations()) {
                loc.setWasteUserId(wasteUserDataInserted.getId());
                locationRepository.save(loc);
            }

            for (User user : wu.getUsers()) {
                user.setWasteUserId(wasteUserDataInserted.getId());
                user.setPassword(PasswordHash.hashPassword(user.getPassword()));
                userRepository.save(user);
            }

            return ResponseEntity.ok().body(wasteUserDataInserted);
        } else {
            wasteUserRepository.findById(id)
                    .map(updateData -> {
                        updateData = wu.getWasteUserData();
                        WasteUserData wasteOwnerUpdated = wasteUserRepository.save(updateData);
                        return ResponseEntity.ok().body(wasteOwnerUpdated);
                    });

            for (Location location : wu.getLocations()) {

                locationRepository.findById(location.getMyId()).map(locationUpdate -> {

                    locationUpdate.setDescription(location.getDescription());
                    locationUpdate.setLatitude(location.getLatitude());
                    locationUpdate.setLongitude(location.getLongitude());
                    locationUpdate.setWasteOwnerId(location.getWasteOwnerId());

                    Location locationUpdated = locationRepository.save(locationUpdate);

                    return ResponseEntity.ok().body(locationUpdated);
                });

            }

        }
        return null;
    }

    //========================== DELETE METHODS ==================================
    @DeleteMapping(path = "/removewasteuser/{id}")
    @ResponseBody
    public ResponseEntity<?> removeWasteUser(@PathVariable String id) {

        return wasteUserRepository.findById(id)
                .map(deletedUser -> {

                    wasteUserRepository.deleteById(id);
                    System.out.println("Removed waste user '" + deletedUser.getName() + "' deleted!");
                    return ResponseEntity.ok().body(deletedUser.getId());

                }).orElse(ResponseEntity.notFound().build());

    }

}
