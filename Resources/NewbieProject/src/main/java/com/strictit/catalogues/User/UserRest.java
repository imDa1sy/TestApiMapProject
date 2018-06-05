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

    @Autowired
    PasswordHash PasswordHash;

//=========================== GET METHODS ======================================
    @GetMapping(path = "/getallusers")
    public List<User> getAllUsers() {

        List<User> userList = userRepository.findAll();

        return userList;
    }

    @GetMapping(path = "/getuserbyid/{id}")
    public ResponseEntity getUserById(@PathVariable String id) {

        return userRepository.findById(id).map(oneUser
                -> ResponseEntity.ok().body(oneUser))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping(path = "/authenticate")
    public ResponseEntity Authenticate(@RequestBody User user) {
        return userRepository.findByUserName(user.getUserName()).map(oneUser -> {
            
            User localUser = new User();
            if (oneUser.getUserName().equals(user.getUserName()) && oneUser.getPassword().equals(PasswordHash.hashPassword(user.getPassword()))) {
 
                localUser.setId(oneUser.getId());
                localUser.setUserName(oneUser.getUserName());
                localUser.setRole(oneUser.getRole());
                localUser.setAuthenticated(true);
            }else{
                localUser.setAuthenticated(false);
                
            }

            return ResponseEntity.ok().body(localUser);
        }).orElse(ResponseEntity.notFound().build());
    }

//========================== UPDATE-INESRT METHODS ====================================
    @PutMapping(path = "/updateuser/{id}")
    public ResponseEntity updateUser(@PathVariable String id, @RequestBody User user) {

        if (id.equalsIgnoreCase("null")) {
            User userInserted = user;
            userInserted.setPassword(PasswordHash.hashPassword(user.getPassword()));
            userRepository.save(userInserted);

            System.out.println("after insert");
            return ResponseEntity.ok().body(userInserted);
        } else {
            return userRepository.findById(id).map(updateData -> {
                updateData = user;
                updateData.setPassword(PasswordHash.hashPassword(user.getPassword()));
                User userUpdated = userRepository.save(updateData);
                System.out.println("User with id=' " + updateData.getId() + "' updated!");

                return ResponseEntity.ok().body(userUpdated);

            }).orElse(ResponseEntity.notFound().build());
        }
    }

//========================== DELETE METHODS ====================================    
    @DeleteMapping(path = "/removeuser/{id}")
    public ResponseEntity removeUser(@PathVariable String id) {

        return userRepository.findById(id).map(deletedUser -> {

            userRepository.deleteById(id);
            System.out.println("User with id= '" + deletedUser.getId() + "' deleted!");

            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }
}
