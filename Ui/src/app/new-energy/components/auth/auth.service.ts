import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { restConfig } from '../restConfig';
import { User } from '../user/User.class';

@Injectable()
export class AuthService {
    authenticateResponse: any;
    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    bSubject = new BehaviorSubject("");
    private loggedErr: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loggedInAs: string;

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    get isloggedErr() {
        return this.loggedErr.asObservable();
    }
    constructor(private http: Http, private router: Router) { }

    login(user: User) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
      //call rest api to autenticate user 
        this.http.post('http://' + restConfig.Host + ':' + restConfig.Port + '/api/authenticate',
            JSON.stringify({
                userName: user.userName,
                password: user.password
            }), options).subscribe(
                (res: Response) => {
                    this.authenticateResponse = res.json();
                    if (this.authenticateResponse != null) {
                        if (this.authenticateResponse.authenticated == true) {

                            this.loggedIn.next(true);
                            this.loggedInAs = this.authenticateResponse.userName;
                            this.bSubject.next(this.authenticateResponse.role);
                            this.router.navigate(['biodeseuri/new-energy-from-waste/home']);
                          
                        } else {
                            this.loggedErr.next(true);
                        }
                    } else {
                        this.loggedErr.next(true);
                    }

                });
    }

    logout() {
        this.loggedIn.next(false);
        this.loggedErr.next(false);
        this.router.navigate(['biodeseuri/new-energy-from-waste/login']);
    }
}