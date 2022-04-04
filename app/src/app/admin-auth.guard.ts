import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {map, Observable} from 'rxjs';
import { AuthService } from "@app/auth.service";
import {UserService} from "@app/user.service";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private auth: AuthService,
    private router: Router,
    private user: UserService
  ) {
  }

  get isAuthenticated() {
    let loggedIn: boolean | Promise<boolean> | Observable<boolean> = this.auth.isAuthenticated
    if ( !loggedIn ) {
      loggedIn = this.user.isLoggedIn().pipe(map( res => {
        const success = res.authorized
        if ( !success ) {
          this.router.navigate(['/login'])
        }
        this.auth.setAuthenticated(success)
        return success
      }))
    }
    return loggedIn
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthenticated
  }

}
