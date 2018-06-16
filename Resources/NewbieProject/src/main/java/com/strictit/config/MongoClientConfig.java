/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.config;

import com.mongodb.MongoClient;

/**
 *
 * @author Nenad
 */
public class MongoClientConfig {
    private static MongoClient mongoClient = new MongoClient();
    
    private  MongoClientConfig(){
        
    }
    public static MongoClient getConnection(){
        return mongoClient;
    }
}
