import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient ) { }

  getUserInfo(user: string, pass: string, remember: string | undefined = undefined) {
    return this.http.post('/api/login', {
      user,
      pass,
      remember
    }).subscribe(
      data => {
        console.log(`GOT ${JSON.stringify(data)} from server`)
      }
    )
  }
}
