/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteOwner;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.strictit.catalogues.User.PasswordHash;
import com.strictit.catalogues.User.User;
import com.strictit.catalogues.User.UserRepository;
import com.strictit.catalogues.locations.Location;
import com.strictit.catalogues.locations.LocationRepository;
import java.util.List;
import java.util.Optional;
import org.bson.types.ObjectId;
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

    @Autowired
    PasswordHash PasswordHash;

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
        //load all users from database by user id 
        wasteOwner.getUsers().loadByWasteOwnerId(id);
        return ResponseEntity.ok().body(wasteOwner);

    }

    //======================= UPDATE-INSERT METHODS ===================================
    @PutMapping(path = "/updatewasteowner/{id}")
    public ResponseEntity updateWasteOwner(@PathVariable String id, @RequestBody WasteOwner wob) {

        // if waste owner does not exists
        // insert him
        String tempOwnerId;
        if (id.equalsIgnoreCase("null")) {
            WasteOwnerData wasteOwnerDataInserted = wasteOwnerRepository.save(wob.getWasteOwnerData());
            // store the new id into a temp variable for setting the location and users owner id
            tempOwnerId = wasteOwnerDataInserted.getId();
        } else {
            // we already have a waste owner...update amd only save his locations and users
            // store the existing id into a temp variable for setting the location and users owner id
            tempOwnerId = id;

            wasteOwnerRepository.findById(id)
                    .map(updateData -> {
                        updateData = wob.getWasteOwnerData();
                        WasteOwnerData wasteOwnerUpdated = wasteOwnerRepository.save(updateData);
                        return ResponseEntity.ok().body(wasteOwnerUpdated);
                    });

        }

        for (Location location : wob.getLocations()) {
            if (location.getMyId().equalsIgnoreCase("null")) {
                location.setWasteOwnerId(tempOwnerId);
                locationRepository.save(location);
            } else {
                locationRepository.findById(location.getMyId()).map(locationUpdate -> {
                    locationUpdate.setDescription(location.getDescription());
                    locationUpdate.setLatitude(location.getLatitude());
                    locationUpdate.setLongitude(location.getLongitude());
                    locationUpdate.setWasteOwnerId(tempOwnerId);

                    Location locationUpdated = locationRepository.save(locationUpdate);

                    return ResponseEntity.ok().body(locationUpdated);
                });
            }

        }
        for(User user:wob.getUsers()){
            if(user.getMyId().equalsIgnoreCase("null")){
                user.setWasteOwnerId(tempOwnerId);
                user.setPassword(PasswordHash.hashPassword(user.getPassword()));
                userRepository.save(user);
            }else{
                 userRepository.findById(user.getMyId()).map(userUpdate -> {
                    userUpdate.setUserName(user.getUserName());
                    userUpdate.setPassword(PasswordHash.hashPassword(user.getPassword()));
                    userUpdate.setRole(user.getRole());
                    userUpdate.setWasteOwnerId(user.getWasteOwnerId());

                    User userUpdated = userRepository.save(userUpdate);

                    return ResponseEntity.ok().body(userUpdated);
                });
            }
        }
        if(id.equalsIgnoreCase("null")){
            return ResponseEntity.ok().body(null);
        }else{
            return ResponseEntity.ok().body(null);
        }

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
