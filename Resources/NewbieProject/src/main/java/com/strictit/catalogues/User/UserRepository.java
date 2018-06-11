/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author Nenad
 */
public interface UserRepository extends MongoRepository<User, String> {

    public Optional<User> findByUserName(String userName);
     List<User> findByActive(boolean active);
    List<User> findByWasteOwnerId(String wasteOwnerId);
    List<User> findByWasteUserId(String wasteUserId);
}
