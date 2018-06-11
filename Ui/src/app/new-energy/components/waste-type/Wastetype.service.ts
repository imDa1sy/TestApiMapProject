import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { restConfig } from "../restConfig";
import { WasteType } from "./WasteType.class";



@Injectable()
export class WasteTypeService {

    //=============================ATTRIBUTES======================================

    constructor(private http: HttpClient) { }

    //===============================METHODS=======================================
    // loadAllWasteTypes() method returing all waste types
    loadAllWasteTypes(): Observable<WasteType[]> {
        return this.http.get<WasteType[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallwastetypes');
    }

    loadAllActiveWasteTypes(): Observable<WasteType[]> {
        return this.http.get<WasteType[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallactivewastetypes');
    }

    loadWasteTypeById(id): Observable<WasteType> {
        
        return this.http.get<WasteType>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getwastetypebyid/'+id);
    }
}
