import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


type AuthResponseOptions = {
  statusCode: number,
  authenticated: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authenticated = false
  private firstName = ''
  private lastName = ''

  constructor( private http: HttpClient) {}

  getUserInfo(user: string, pass: string, remember: string | undefined = undefined) {
    return this.http.post('/api/login', {
      user,
      pass,
      remember
    })
  }

  setFirstName( firstName: string | undefined ) {
    this.firstName = firstName || ''
  }

  setLastName( lastName: string | undefined ) {
    this.lastName = lastName || ''
  }

  get getFullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  setAuthenticated( authenticated: boolean ) {
    this.authenticated = authenticated
  }

  get getAuthenticated(): boolean {
    return this.authenticated
  }
}
