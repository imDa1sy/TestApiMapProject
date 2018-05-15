/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.biomassOwner;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 *
 * @author Nenad
 */
@Document(collection = "BiomassOwner")
public class BiomassOwner {
    
    @Id
    private String id;
    
    private String firstName;
    private String lastName;
    private String location;
    private String biowasteTypeOutput;
    private Contact contact;

    public String getId() {
        return id;
    }

    public void setId(String _id) {
        this.id = _id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getBiowasteTypeOutput() {
        return biowasteTypeOutput;
    }

    public void setBiowasteTypeOutput(String biowasteTypeOutput) {
        this.biowasteTypeOutput = biowasteTypeOutput;
    }

    public Contact getContact() {
        return contact;
    }

    public void setContact(Contact contact) {
        this.contact = contact;
    }

    @Override
    public String toString() {
        return "BiomassOwner{" + "_id=" + id + ", firstName=" + firstName + 
                                  ", lastName=" + lastName + ", location=" + location + 
                                  ", biowasteTypeOutput=" + biowasteTypeOutput + 
                                  ", contact=" + contact + '}';
    }
   
}
