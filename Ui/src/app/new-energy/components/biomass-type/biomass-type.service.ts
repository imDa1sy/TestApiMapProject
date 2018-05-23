import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class BiomassTypeService {

    //=============================ATTRIBUTES======================================

    constructor(private http: HttpClient) { }

    //===============================METHODS=======================================

    getData(): Observable<BiomassType[]> {
        return this.http.get<BiomassType[]>('http://10.172.192.44:8080/api/getallbiomasstypes');
    }
}
