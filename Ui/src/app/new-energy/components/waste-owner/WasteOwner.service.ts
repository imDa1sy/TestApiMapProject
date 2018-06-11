import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { restConfig } from "../restConfig";
import { WasteOwner } from "./WasteOwner.class";

@Injectable()
export class WasteOwnerService {
    //=============================ATTRIBUTES======================================
    private _ownerIdToMap: string;
    constructor(private http: HttpClient) { }

    //==============================METHODS=======================================
    
    loadAllWasteOwners(): Observable<WasteOwner[]> {
        
        return this.http.get<WasteOwner[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallwasteowners');
    }

    loadAllActiveWasteOwners(): Observable<WasteOwner[]> {
        
        return this.http.get<WasteOwner[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallactivewasteowners');
    }

    loadWasteOwnerById(id): Observable<WasteOwner> {
        
        return this.http.get<WasteOwner>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getwasteownerbyid/'+id);
    }

    loadActiveLocations(id): Observable<WasteOwner> {
        
        return this.http.get<WasteOwner>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallactivelocationsByWasteOwnerId/'+id);
    }
    get ownerIdToMap():string {
        return this._ownerIdToMap;
    }
    set ownerIdToMap(ownerIdToMap:string) {
        this._ownerIdToMap = ownerIdToMap;
    }
}
