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

    @GetMapping(path = "/getallactivewasteusers")
    public List<WasteUserData> getAllActiveWasteUsers() {
        boolean active = true;
        List<WasteUserData> listOfActiveWasteUsers = wasteUserRepository.findByActive(active);
        return listOfActiveWasteUsers;
    }

    @GetMapping(path = "/getwasteuserbyid/{id}")
    public ResponseEntity getWasteUserById(@PathVariable String id) {

        WasteUser wasteUser = new WasteUser();
        Optional<WasteUserData> wasteUserData = wasteUserRepository.findById(id);
        //TODO if not found then return ResponseEntity not found!
        wasteUser.setWasteUserData(wasteUserData.orElse(new WasteUserData()));
        // Load all locations from database by user id
        wasteUser.getLocations().loadByWasteUserId(id);
        //Load all users from database by user id
        wasteUser.getUsers().loadByWasteUserId(id);
        return ResponseEntity.ok().body(wasteUser);
    }

    //======================= UPDATE-INSERT METHODS ===================================
    @PutMapping(path = "/updatewasteuser/{id}")
    public ResponseEntity updateWasteUser(@PathVariable String id, @RequestBody WasteUser wu) {

        // if waste user does not exists
        // insert him
        String tempUserId;
        if (id.equalsIgnoreCase("null")) {
            WasteUserData wasteUserDataInserted = wasteUserRepository.save(wu.getWasteUserData());
            // store the new id into a temp variable for setting the location and users user id
            tempUserId = wasteUserDataInserted.getId();
        } else {
            // we already have a waste userr...update amd only save his locations and users
            // store the existing id into a temp variable for setting the location and users owner id
            tempUserId = id;

            wasteUserRepository.findById(id)
                    .map(updateData -> {
                        updateData = wu.getWasteUserData();
                        WasteUserData wasteUserUpdated = wasteUserRepository.save(updateData);
                        return ResponseEntity.ok().body(wasteUserUpdated);
                    });

        }

        for (Location location : wu.getLocations()) {
            if (location.getMyId().equalsIgnoreCase("null")) {
                location.setWasteUserId(tempUserId);
                locationRepository.save(location);
            } else {
                locationRepository.findById(location.getMyId()).map(locationUpdate -> {
                    locationUpdate.setDescription(location.getDescription());
                    locationUpdate.setLatitude(location.getLatitude());
                    locationUpdate.setLongitude(location.getLongitude());
                    locationUpdate.setWasteUserId(tempUserId);

                    Location locationUpdated = locationRepository.save(locationUpdate);

                    return ResponseEntity.ok().body(locationUpdated);
                });
            }

        }
        for (User user : wu.getUsers()) {
            if (user.getMyId().equalsIgnoreCase("null")) {
                user.setWasteUserId(tempUserId);
                user.setPassword(PasswordHash.hashPassword(user.getPassword()));
                userRepository.save(user);
            } else {
                // In current version update user is not available from waste user update form
                // only can be displayed to get overview of his users.

                userRepository.findById(user.getMyId()).map(userUpdate -> {
                    userUpdate.setActive(user.isActive());

                    User userUpdated = userRepository.save(userUpdate);

                    return ResponseEntity.ok().body(userUpdated);
                });
            }
        }
        if (id.equalsIgnoreCase("null")) {
            return ResponseEntity.ok().body(null);
        } else {
            return ResponseEntity.ok().body(null);
        }

    }

    //========================== DELETE METHODS ==================================
    @DeleteMapping(path = "/removewasteuser/{id}")
    @ResponseBody
    public ResponseEntity<?> removeWasteUser(@PathVariable String id) {

        return wasteUserRepository.findById(id)
                .map(deletedUser -> {
                    deletedUser.setActive(false);
                    wasteUserRepository.save(deletedUser);
                    System.out.println("Removed waste user '" + deletedUser.getName() + "' deleted!");
                    return ResponseEntity.ok().body(deletedUser.getId());

                }).orElse(ResponseEntity.notFound().build());

    }

}
