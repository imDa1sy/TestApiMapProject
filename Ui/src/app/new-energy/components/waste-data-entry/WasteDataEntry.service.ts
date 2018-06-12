import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { restConfig } from "../restConfig";
import { WasteDataEntry } from "./WasteDataEntry.class";


@Injectable()
export class WasteDataEntryService {
    //=============================ATTRIBUTES======================================
    
    constructor(private http: HttpClient) { }

    //==============================METHODS=======================================

    loadAllWasteData(): Observable<WasteDataEntry[]> {
        
        return this.http.get<WasteDataEntry[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallwastedata');
    }
    loadAllActiveWasteData(): Observable<WasteDataEntry[]> {
        
        return this.http.get<WasteDataEntry[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallactivewastedata');
    }
    loadAllWasteDataById(id): Observable<WasteDataEntry> {
        
        return this.http.get<WasteDataEntry>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallwastedatabyid/'+id);
    }
    loadWasteDataById(id): Observable<WasteDataEntry> {
        
        return this.http.get<WasteDataEntry>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getwastedatabyid/'+id);
    }
  
}