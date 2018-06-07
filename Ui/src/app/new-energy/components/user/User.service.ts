import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { restConfig } from "../restConfig";
import { User } from "./User.class";





@Injectable()
export class UserService {

    //=============================ATTRIBUTES======================================

    constructor(private http: HttpClient) { }

    //===============================METHODS=======================================
    // getData() method returing all users
    LoadAllUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://' + restConfig.Host + ':' + restConfig.Port + '/api/getallusers');
    }
    loadAllActiveUsers(): Observable<User[]> {
        return this.http.get<User[]>('http://' + restConfig.Host + ':' + restConfig.Port + '/api/getallactiveusers');
    }
    load(id): Observable<User> {

        return this.http.get<User>('http://' + restConfig.Host + ':' + restConfig.Port + '/api/getuserbyid/' + id);
    }
}