import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { restConfig } from "../restConfig";
import { WasteUser } from "./WasteUser.class";
@Injectable()
export class WasteUserService{
   //=============================ATTRIBUTES======================================
  
   constructor(private http: HttpClient) { } 

   //==============================METHODS=======================================

   loadAllWasteUsers(): Observable<WasteUser[]> {
       
       return this.http.get<WasteUser[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallwasteusers');
   }

   loadAllActiveWasteUsers(): Observable<WasteUser[]> {
       
    return this.http.get<WasteUser[]>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getallactivewasteusers');
   }

   loadWasteUserById(id): Observable<WasteUser> {
       
       return this.http.get<WasteUser>('http://'+restConfig.Host+':'+restConfig.Port+'/api/getwasteuserbyid/'+id);
   }

}