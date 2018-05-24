import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class BiomassOwnerService {
    //=============================ATTRIBUTES======================================

    constructor(private http: HttpClient) { }

    //==============================METHODS=======================================

    getData(): Observable<BiomassOwner[]> {
        return this.http.get<BiomassOwner[]>('http://10.172.192.44:8080/api/getallbiomassowners');
    }
}
