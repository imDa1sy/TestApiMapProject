import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
 //Method is used to activate routes after user login.
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isLoggedIn.pipe(
            take(1),
            map((isLoggedIn: boolean) => {
                if (!isLoggedIn) {
                    this.router.navigate(['/biodeseuri/new-energy-from-waste']);
                    return false;
                }
                return true;
            })
        );
    }
}