import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { restConfig } from "../restConfig";
import { WasteOwner } from "./WasteOwner.class";

@Injectable()
export class WasteOwnerService {
    //=============================ATTRIBUTES======================================
  
    constructor(private http: HttpClient) { }

    //==============================METHODS=======================================

    getData(): Observable<WasteOwner[]> {
        
        return this.http.get<WasteOwner[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallwasteowners');
    }
    load(id): Observable<WasteOwner> {
        
        return this.http.get<WasteOwner>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getwasteownerbyid/'+id);
    }
}
