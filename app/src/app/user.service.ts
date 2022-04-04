import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";

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

  constructor(private http: HttpClient) { }

  public isUserAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  login(username: string, password: string) {

  }

  isLoggedIn() {
    return this.http.get<authResponse>(
      '/api/auth'
      )
  }

  get isAuthenticated() {
    let loggedIn: boolean | Promise<boolean> | Observable<boolean> = false
    if ( !loggedIn ) {
      loggedIn = this.isLoggedIn().pipe(map( res => {
        return res.authorized
      }))
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
