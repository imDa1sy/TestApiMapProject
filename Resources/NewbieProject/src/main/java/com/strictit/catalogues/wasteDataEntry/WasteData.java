/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteDataEntry;

import com.strictit.catalogues.locations.Location;
import com.strictit.catalogues.wasteOwner.WasteOwnerData;
import com.strictit.catalogues.wasteType.WasteType;
import java.util.Optional;

/**
 *
 * @author Nenad
 */
public class WasteData {
    
    private WasteDataEntry wasteDataEntry;
    private Optional<WasteOwnerData> wasteOwnerData;
    private Optional<Location> location;
    private Optional<WasteType> wasteType;
    

    public WasteDataEntry getWasteDataEntry() {
        return wasteDataEntry;
    }

    public void setWasteDataEntry(WasteDataEntry wasteDataEntry) {
        this.wasteDataEntry = wasteDataEntry;
    }

    
    public Optional<WasteOwnerData> getWasteOwnerData() {
        return wasteOwnerData;
    }

    public void setWasteOwnerData(Optional<WasteOwnerData> wasteOwnerData) {
        this.wasteOwnerData = wasteOwnerData;
    }

    public Optional<Location> getLocation() {
        return location;
    }

    public void setLocation(Optional<Location> location) {
        this.location = location;
    }

    public Optional<WasteType> getWasteType() {
        return wasteType;
    }

    public void setWasteType(Optional<WasteType> wasteType) {
        this.wasteType = wasteType;
    }
    
    
    
}
