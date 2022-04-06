import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {Router} from "@angular/router";

interface authResponse {
  authorized: boolean,
  authLevel?: number,
}

interface dataResponse {
  authorized: boolean,
  username?: string,
  firstName?: string,
  lastName?: string,
}

interface passFailResponse {
  success: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  public isUserAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  isLoggedIn() {
    return this.http.get<authResponse>(
      '/api/auth'
      )
  }

  isAuthenticated( redirectIfNotAuth: boolean = false ) {
    let loggedIn: boolean | Promise<boolean> | Observable<boolean> = false
    if ( !loggedIn ) {
      loggedIn = this.isLoggedIn().pipe(map( res => {
        return res.authorized
      }))
    }
    if ( redirectIfNotAuth ) {
      if (typeof loggedIn == 'boolean') {
        if (!loggedIn) {
          this.router.navigate(['/login'])
        }
      } else {
        loggedIn.subscribe(authed => {
          if (!authed) {
            this.router.navigate(['/login'])
          }
        })
      }
    }

    return loggedIn
  }

  getUserData() {
    return this.http.get<dataResponse>(
      '/api/user-data'
    )
  }

  logout() {
    return this.http.get<passFailResponse>(
      '/api/logout'
    )
  }
}
