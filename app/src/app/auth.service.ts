import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {UserService} from "@app/user.service";
import {AdminAuthGuard} from "@app/admin-auth.guard";
import {Observable} from "rxjs";


type AuthResponseOptions = {
  statusCode: number,
  authenticated: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = false

  constructor(
    private http: HttpClient,
  ) {}

  getUserInfo(user: string, pass: string, remember: string | undefined = undefined) {
    return this.http.post('/api/login', {
      user,
      pass,
      remember
    })
  }
}
