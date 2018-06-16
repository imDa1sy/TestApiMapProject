/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.locations;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.strictit.config.MongoClientConfig;
import java.util.ArrayList;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.stereotype.Service;

/**
 *
 * @author Nenad
 */
public class Locations extends ArrayList<Location> {

    @Autowired
    LocationRepository locationRepository;
    MongoClient mongoClient = MongoClientConfig.getConnection();
 
    DB database = mongoClient.getDB("Biodeseuri");

    public int loadByWasteOwnerId(String wasteOwnerId) {
        //returning wasteOwner-s from db with matching wasteOwnerId

        return loadByField("wasteOwnerId", wasteOwnerId);

    }

    public int loadByWasteUserId(String wasteUserId) {
        //returning wasteUser-s from db with matching wasteUserId
        return loadByField("wasteUserId", wasteUserId);

    }

    private int loadByField(String field, String id) {
        /* loadByField load users from User DB based on field parameter 
      and is called by loadByWasteOwnerId and loadByUserId**/
        DBCollection collection = database.getCollection("Locations");

        DBObject searchQuery = new BasicDBObject();
        searchQuery.put(field, id);

        DBCursor cursor = collection.find(searchQuery);
        Gson gson = new Gson();
        while (cursor.hasNext()) {
            BasicDBObject theObj =  (BasicDBObject) cursor.next();
          
             Location temp =gson.fromJson(theObj.toString(), Location.class);
             temp.setMyId(theObj.getObjectId("_id").toString());
             this.add(temp);
             
         }
        return this.size();
    }

}
