/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.User;

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
public class UserRest {

    @Autowired
    UserRepository userRepository;

//=========================== GET METHODS ======================================
    @GetMapping(path = "/getallusers")
    public List<User> getAllUsers() {
        System.out.println("");

        return userRepository.findAll();
    }

    @GetMapping(path = "getuserbyid/{id}")
    public ResponseEntity getUserById(@PathVariable String id) {

        return userRepository.findById(id).map(oneUser
                -> ResponseEntity.ok().body(oneUser))
                .orElse(ResponseEntity.notFound().build());
    }

//========================== INSERT METHODS ====================================
    @PostMapping(path = "/insertuser")
    public User insertUser(@RequestBody User user) {

        System.out.println("User inserted!");

        return userRepository.save(user);
    }

//========================== UPDATE METHODS ====================================
    @PutMapping(path = "/updateuser/{id}")
    public ResponseEntity updateUser(@PathVariable String id, @RequestBody User user) {

        return userRepository.findById(id).map(updateData -> {
            updateData.setRole(user.getRole());
            updateData.setUserName(user.getUserName());
            updateData.setPassword(user.getPassword());
            updateData.setUserEmail(user.getUserEmail());

            User updatedUser = userRepository.save(updateData);
            System.out.println("User with id=' " + updateData.getId() + "' updated!");

            return ResponseEntity.ok().body(updatedUser);
        }).orElse(ResponseEntity.notFound().build());

    }

//========================== DELETE METHODS ====================================    
    @DeleteMapping(path = "removeuser/{id}")
    public ResponseEntity removeUser(@PathVariable String id) {

        return userRepository.findById(id).map(deletedUser -> {

            userRepository.deleteById(id);
            System.out.println("User with id= '" + deletedUser.getId() + "'");

            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
