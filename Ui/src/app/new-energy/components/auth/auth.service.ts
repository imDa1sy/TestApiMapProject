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
    setRole = new BehaviorSubject("");
    showLoginDialog = new BehaviorSubject(true);
    private loggedErr: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    loggedInAs: string;
    userId :string;

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }
    get isloggedErr() {
        return this.loggedErr.asObservable();
    }
    constructor(private http: Http, private router: Router) { }

    ngOnInit(){
        this.showLoginDialog.next(true); // on init login dialog is showed
    }

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

                            this.loggedIn.next(true); //send new-energy component response to activate nav bar 
                            this.userId = this.authenticateResponse.id;
                            this.loggedInAs = this.authenticateResponse.userName; 
                            this.setRole.next(this.authenticateResponse.role);
                            this.showLoginDialog.next(false); //send response to login dialog to hide login dialog
                            this.router.navigate(['biodeseuri/new-energy-from-waste/home']);
                          
                        } else {
                            this.loggedErr.next(true); //if user is not authenticated send error to login dialog to display
                        }
                    } else {
                        this.loggedErr.next(true); //if user is not authenticated send error to login dialog to display
                    }

                });
    }

    logout() {
        this.loggedIn.next(false); //send new-energy component response to deactivate nav bar 
        this.loggedErr.next(false);
        this.showLoginDialog.next(true); //send response to login dialog to show login dialog
        this.router.navigate(['biodeseuri/new-energy-from-waste']);
    }
}