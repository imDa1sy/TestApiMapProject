import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { restConfig } from "../restConfig";
import { WasteData } from "./WasteDataEntry.class";
import { WasteTypeFilter } from "../waste-type/WasteType.class";



@Injectable()
export class WasteDataEntryService {
    //=============================ATTRIBUTES======================================
    
    constructor(private http: HttpClient) { }

    //==============================METHODS=======================================

    loadAllWasteData(): Observable<WasteData[]> {
        
        return this.http.get<WasteData[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallwastedata');
    }
    loadAllActiveWasteData(filter: WasteTypeFilter): Observable<WasteData[]> {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
    
        return this.http.put<WasteData[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallactivewastedata',      
        JSON.stringify( filter ), {headers} );
    }
    loadAllWasteDataById(id,filter: WasteTypeFilter): Observable<WasteData[]> {
        const headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put<WasteData[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallwastedatabyid/'+id,      
        JSON.stringify( filter ), {headers} );
    }
    loadWasteDataById(id): Observable<WasteData> {
        
        return this.http.get<WasteData>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getwastedatabyid/'+id);
    }
  
}