import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return this.http.get<authResponse>(
      '/api/auth'
      )
  }

  getUserData() {
    return this.http.get<dataResponse>(
      '/api/user-data'
    )
  }
}
