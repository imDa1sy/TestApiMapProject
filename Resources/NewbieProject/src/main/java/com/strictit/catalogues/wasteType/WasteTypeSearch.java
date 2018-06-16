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
public class WasteTypeSearch extends WasteType {
    private boolean search;

    public boolean isSearch() {
        return search;
    }

    public void setSearch(boolean search) {
        this.search = search;
    }

    @Override
    public String toString() {
        return "WasteTypeSearch{" + "search=" + search + '}';
    }
    
}
