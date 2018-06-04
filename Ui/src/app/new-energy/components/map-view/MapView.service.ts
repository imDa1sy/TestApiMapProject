import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { restConfig } from "../restConfig";


@Injectable()
export class MapViewService {
    //=============================ATTRIBUTES======================================

    constructor(private http: HttpClient) { }

    //==============================METHODS=======================================

    getData(): Observable<Location[]> {
        
        return this.http.get<Location[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getalllocations');
    }
    load(id): Observable<Location> {
        
        return this.http.get<Location>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getlocationbyid/'+id);
    }
}