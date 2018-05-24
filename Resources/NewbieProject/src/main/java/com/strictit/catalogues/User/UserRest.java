/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.User;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author qa
 */
@RestController
@RequestMapping("/api")
public class UserRest {
    
    private Mongo mongoClient = new MongoClient("localhost", 27017);
    private DB db = mongoClient.getDB("test");
    private List components;
    
    public void loadUsers(){
        DBCollection col = db.getCollection("user");
        components = new ArrayList();
        DBCursor cursor = col.find();
        while (cursor.hasNext()) {
            components.add(cursor.next());
        }
    }
    
    @RequestMapping(path = "/getAllUsers")
    @ResponseBody
    public ResponseEntity<?> getAllUsers(){
        loadUsers();
        System.out.println(components);
        return new ResponseEntity<>(components.toString(), HttpStatus.OK);  
    }
    
}
