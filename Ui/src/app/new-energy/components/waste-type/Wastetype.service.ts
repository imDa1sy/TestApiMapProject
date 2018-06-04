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
    // getData() method returing all waste types
    getData(): Observable<WasteType[]> {
        return this.http.get<WasteType[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallwastetypes');
    }
}
