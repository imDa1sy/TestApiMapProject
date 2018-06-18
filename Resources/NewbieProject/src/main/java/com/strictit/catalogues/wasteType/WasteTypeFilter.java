/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.strictit.catalogues.wasteType;

/**
 *
 * @author Nenad
 */
public class WasteTypeFilter {

    boolean inFuture;
    double NElon;
    double NElat;
    double SWlon;
    double SWlat;
    WasteTypeSearch[] wasteTypeSearch;

    public boolean isInFuture() {
        return inFuture;
    }

    public void setInFuture(boolean inFuture) {
        this.inFuture = inFuture;
    }

    public double getNElon() {
        return NElon;
    }

    public void setNElon(double NElon) {
        this.NElon = NElon;
    }

    public double getNElat() {
        return NElat;
    }

    public void setNElat(double NElat) {
        this.NElat = NElat;
    }

    public double getSWlon() {
        return SWlon;
    }

    public void setSWlon(double SWlon) {
        this.SWlon = SWlon;
    }

    public double getSWlat() {
        return SWlat;
    }

    public void setSWlat(double SWlat) {
        this.SWlat = SWlat;
    }

    public WasteTypeSearch[] getWasteTypeSearch() {
        return wasteTypeSearch;
    }

    public void setWasteTypeSearch(WasteTypeSearch[] wasteTypeSearch) {
        this.wasteTypeSearch = wasteTypeSearch;
    }

    @Override
    public String toString() {
        return "WasteTypeFilter{" + "inFuture=" + inFuture + ", NElon=" + NElon + ", NElat=" + NElat + ", SWlon=" + SWlon + ", SWlat=" + SWlat + ", wasteTypeSearch=" + wasteTypeSearch + '}';
    }

     
}
