/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteDataEntry;

import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.strictit.catalogues.locations.Location;
import com.strictit.catalogues.locations.LocationRepository;
import com.strictit.catalogues.wasteOwner.WasteOwnerData;
import com.strictit.catalogues.wasteOwner.WasteOwnerRepository;
import com.strictit.catalogues.wasteType.WasteType;
import com.strictit.catalogues.wasteType.WasteTypeFilter;
import com.strictit.catalogues.wasteType.WasteTypeRepository;
import com.strictit.catalogues.wasteType.WasteTypeSearch;
import com.strictit.config.MongoClientConfig;
import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.time.Month;
import java.util.Date;
/**
 *
 * @author daisy
 */
@RestController
@RequestMapping("/api")
@CrossOrigin("*")

public class WasteDataEntryRest {

    @Autowired
    WasteDataEntryRepository wasteDataEntryRepository;

    @Autowired
    WasteOwnerRepository wasteOwnerRepository;

    @Autowired
    LocationRepository locationRepository;

    @Autowired
    WasteTypeRepository wasteTypeRepository;

    //======================= GET METHODS =====================================
    @PutMapping(path = "/getallwastedata")
    public ResponseEntity getAllWasteData(@RequestBody String filterData) {
        List<WasteDataEntry> getTransationData
                = wasteDataEntryRepository.findAll();
        return ResponseEntity.ok().body(getTransationData);
    }
      // method is returning list of waste data for specific waste owner
    @PutMapping(path = "/getallwastedatabyid/{wasteOwnerId}")
    public ResponseEntity getAllWasteDataById(@PathVariable String wasteOwnerId,@RequestBody String filterDataString) {
          
        Gson gsonObj = new Gson();
        WasteTypeFilter filterData = gsonObj.fromJson(filterDataString, WasteTypeFilter.class);

        // mongo database access definitions
        // get mongoClient
        MongoClient mongoClient = MongoClientConfig.getConnection();
        // define databse
        DB database = mongoClient.getDB("Biodeseuri");
        // the collection we are going to access and search for
        DBCollection collection = database.getCollection("WasteData");
       
        //result list for returning data
        List wasteList = new ArrayList();
        // list for searching waste types marked as parameters by isSearch() = true'
        List wasteTypeIds = new ArrayList(); 
       
        // iterate through the filter data
        // and get all the waste types we have to search for
        for(WasteTypeSearch filterWt : filterData.getWasteTypeSearch()){
            // if the search attribute is set then we have to search for it
            if (filterWt.isSearch()){
               wasteTypeIds.add(filterWt.getId());                
            }
         }
        
        // now it is time to define the query
        BasicDBObject wasteDataquery = new BasicDBObject();  

        // create a list of and Querys for the ANDed criteria
        List<BasicDBObject> andQuery = new ArrayList();
        
        // instance of current time to be used in filter query
           Date currentDate = new Date();
           //addQuery filter to display data by wasteOwnerId
        andQuery.add(new BasicDBObject("wasteOwnerId",wasteOwnerId));
         //addQuery filter to display data  by array of wasteTypeIds
        andQuery.add(new BasicDBObject("wasteTypeId", new BasicDBObject("$in",wasteTypeIds)));
        if (!filterData.isExpired()){
            
            List<BasicDBObject> orQueryList = new ArrayList<>();
                //add query filter to display validityDateEnd grater or equal then current date
                orQueryList.add(new BasicDBObject("validityDateEnd", new BasicDBObject( "$gte", currentDate )));
                //add query filter to display data that is not expired if validityDateEnd does not exist 
                orQueryList.add(new BasicDBObject("validityDateEnd", new BasicDBObject( "$exists", false )));
                // add query filter to display data if expired is false
                andQuery.add(new BasicDBObject("expired", new BasicDBObject("$eq", false )));
             
             andQuery.add(new BasicDBObject()
                  .append("$or", orQueryList));
        
        }else if(filterData.isExpired())  {
                // if isExpired true or date is lesser than expire date
                //addQuery filter to display data which date is expired or lesser then current date.
            List<BasicDBObject> orQueryList = new ArrayList<>();
                orQueryList.add(new BasicDBObject("validityDateEnd", new BasicDBObject( "$lt", currentDate )));
                orQueryList.add(new BasicDBObject("expired", new BasicDBObject("$eq", true )));
               
             andQuery.add(new BasicDBObject()
                  .append("$or", orQueryList));
        } 
        
        // put the andQuery into the data query                       
         
        wasteDataquery.put("$and",andQuery);     
        //execute the query
        DBCursor cursor = collection.find(wasteDataquery);
       //iterate through the result documents
        while (cursor.hasNext()) {

            WasteData localWasteData = new WasteData();
              //here waste data base information is set 
            BasicDBObject tempDBObject =(BasicDBObject) cursor.next();

            String sTemp;
            sTemp = gsonObj.toJson(tempDBObject);
            WasteDataEntry tempWasteDataEntry = gsonObj.fromJson(sTemp, WasteDataEntry.class );
             tempWasteDataEntry.setId(tempDBObject.getObjectId("_id").toString());
            localWasteData.setWasteDataEntry((WasteDataEntry) tempWasteDataEntry);

            //here we retreive current waste owner information and add it to waste data object
            Optional<WasteOwnerData> wasteOwnerData = wasteOwnerRepository.findById(localWasteData.getWasteDataEntry().getWasteOwnerId());
            localWasteData.setWasteOwnerData(wasteOwnerData);
            
            //here we retreive location of waste data and add it to waste data object
            Optional<Location> location = locationRepository.findById(localWasteData.getWasteDataEntry().getWasteLocationId());
            //here we retreive waste type and add it to waste data object
            
            localWasteData.setLocation(location);
            Optional<WasteType> wasteType = wasteTypeRepository.findById(localWasteData.getWasteDataEntry().getWasteTypeId());

            localWasteData.setWasteType(wasteType);
            //here waste object is populated and added to wasteList list to be sent

            wasteList.add(localWasteData);

        }
        return ResponseEntity.ok().body(wasteList);
    }

    //method is returning all waste data from all waste owners
     @PutMapping(path = "/getallactivewastedata")
    public ResponseEntity getAllActiveWasteData(@RequestBody String filterDataString) {
       
        Gson gsonObj = new Gson();
        WasteTypeFilter filterData = gsonObj.fromJson(filterDataString, WasteTypeFilter.class);

        // mongo database access definitions
        // get mongoClient
        MongoClient mongoClient = MongoClientConfig.getConnection();
        // define databse
        DB database = mongoClient.getDB("Biodeseuri");
        // the collection we are going to access and search for
        DBCollection collection = database.getCollection("WasteData");
       
        //result list for returning data
        List wasteList = new ArrayList();
        // list for searching waste types marked as parameters by isSearch() = true'
        List wasteTypeIds = new ArrayList(); 
       
        // iterate through the filter data
        // and get all the waste types we have to search for
        for(WasteTypeSearch filterWt : filterData.getWasteTypeSearch()){
            // if the search attribute is set then we have to search for it
            if (filterWt.isSearch()){
               wasteTypeIds.add(filterWt.getId());                
            }
         }
        
        // now it is time to define the query
        BasicDBObject wasteDataquery = new BasicDBObject();  

        // create a list of and Querys for the ANDed criteria
        List<BasicDBObject> andQuery = new ArrayList();
        
        // instance of current time to be used in filter query
           Date currentDate = new Date();
         //addQuery filter to display data  by array of wasteTypeIds
        andQuery.add(new BasicDBObject("wasteTypeId", new BasicDBObject("$in",wasteTypeIds)));
        if (filterData.isInFuture()){
            // if isFuture true addQuery filter to display data which date is grater then current date.
            andQuery.add(new BasicDBObject("validityDateStart", new BasicDBObject( "$gt", currentDate )));
            System.out.println("current time" + currentDate);
        } else {
            // if isFuture false addQuery filter to display data which date is lesser then current date.
          andQuery.add(new BasicDBObject("validityDateStart", new BasicDBObject( "$lt", currentDate )));
        }
        //add $or list to query
        List<BasicDBObject> orQueryList = new ArrayList<>();
                //add query filter to display validityDateEnd grater or equal then current date
                orQueryList.add(new BasicDBObject("validityDateEnd", new BasicDBObject( "$gte", currentDate )));
                //add query filter to display data that is not expired if validityDateEnd does not exist 
                orQueryList.add(new BasicDBObject("validityDateEnd", new BasicDBObject( "$exists", false )));
                // add query filter to display data if expired is false
                andQuery.add(new BasicDBObject("expired", new BasicDBObject("$eq", false )));
             
             andQuery.add(new BasicDBObject()
                  .append("$or", orQueryList));
        
       // andQuery.add(new BasicDBObject("expired", new BasicDBObject("$eq", false )));
        // put the andQuery into the data query                       
         
        wasteDataquery.put("$and",andQuery);     
        //execute the query
        DBCursor cursor = collection.find(wasteDataquery);
       //iterate through the result documents
        while (cursor.hasNext()) {

            WasteData localWasteData = new WasteData();
              //here waste data base information is set 
            BasicDBObject tempDBObject =(BasicDBObject) cursor.next();

            String sTemp;
            sTemp = gsonObj.toJson(tempDBObject);
            WasteDataEntry tempWasteDataEntry = gsonObj.fromJson(sTemp, WasteDataEntry.class );
             tempWasteDataEntry.setId(tempDBObject.getObjectId("_id").toString());
            localWasteData.setWasteDataEntry((WasteDataEntry) tempWasteDataEntry);

            //here we retreive location of waste data and add it to waste data object
            Optional<Location> location = locationRepository.findById(localWasteData.getWasteDataEntry().getWasteLocationId());
            
            Location tempLocation = location.orElse(null);
            
            boolean bGoes;
            
            if ( tempLocation == null ) {
              bGoes = false;
            } else {
                bGoes = LocationInBounds( tempLocation, filterData.getNElat(), filterData.getNElon(),
                        filterData.getSWlat(), filterData.getSWlon());
            }
 
            if ( bGoes ){
                // to continue to add this wastedata to the result
                // we have to check the location in the bounds given as parameters

                localWasteData.setLocation(location);

                //here we retreive current waste owner information and add it to waste data object
                Optional<WasteOwnerData> wasteOwnerData = wasteOwnerRepository.findById(localWasteData.getWasteDataEntry().getWasteOwnerId());
                localWasteData.setWasteOwnerData(wasteOwnerData);



                //here we retreive waste type and add it to waste data object
                Optional<WasteType> wasteType = wasteTypeRepository.findById(localWasteData.getWasteDataEntry().getWasteTypeId());

                localWasteData.setWasteType(wasteType);
                //here waste object is populated and added to wasteList list to be sent

                wasteList.add(localWasteData);
            }

        };
        
        return ResponseEntity.ok().body(wasteList);
    }
    
    @GetMapping(path = "/getwastedatabyid/{id}")
    public ResponseEntity getWasteById(@PathVariable String id) {
        return wasteDataEntryRepository.findById(id).map(oneTransation
                -> ResponseEntity.ok().body(oneTransation))
                .orElse(ResponseEntity.notFound().build());

    }

    //========================= UPDATE METHODS ====================================
    @PutMapping(path = "/updatewastedata/{id}")
    public ResponseEntity updateWasteData(@PathVariable String id, @RequestBody WasteDataEntry wd) {
        if (id.equalsIgnoreCase("null")) {

            WasteDataEntry wasteDatEntryInserted = wasteDataEntryRepository.save(wd);
            System.out.println("after insert");
            return ResponseEntity.ok().body(wasteDatEntryInserted);

        } else {

            return wasteDataEntryRepository.findById(id).map(updateData -> {
                updateData = wd;
                WasteDataEntry wasteDataUpdated = wasteDataEntryRepository.save(updateData);
                System.out.println("Waste data with id=' " + updateData.getId() + "' updated!");

                return ResponseEntity.ok().body(wasteDataUpdated);

            }).orElse(ResponseEntity.notFound().build());
        }
    }

    //========================= DELETE METHODS ===================================
    @DeleteMapping(path = "/removewastedata/{id}")
    public ResponseEntity removeWasteData(@PathVariable String id) {
        return wasteDataEntryRepository.findById(id).map(deleteData -> {
            deleteData.setExpired(true);
            wasteDataEntryRepository.save(deleteData);
            System.out.println("Removed waste data with type= '" + deleteData.getId() + "' deleted!");
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.notFound().build());
    }

    private boolean LocationInBounds(Location tempLocation, double NElat, double NElon, double SWlat, double SWlon) {   
 
        boolean eastBound = tempLocation.getLongitude() < NElon;
        boolean westBound =  tempLocation.getLongitude() > SWlon;
        boolean inLong;

        if ( NElon < SWlon) {
            inLong = eastBound || westBound;
        } else {
            inLong = eastBound && westBound;
        }

        boolean inLat = tempLocation.getLatitude() > SWlat && tempLocation.getLatitude() < NElat;

        return inLat && inLong;
    };    

}