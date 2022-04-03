import { Component, OnInit } from '@angular/core'
import {AuthService} from "@app/auth.service";
import {Router} from "@angular/router";

type LoginResponseOptions = {
  statusCode: number,
  authenticated: boolean,
  userData?: {
    firstName: string,
    lastName: string
  }
  redirect?: string,
  authToken?: {
    value: string,
    expires: string
  }
  permissions?: number
}

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
} )
export class LoginComponent implements OnInit {

  validated: boolean = false
  user: string = ""

  constructor( private Auth: AuthService, private router: Router ) {
  }

  ngOnInit(): void {
  }

  private setCookie(name: string, value: string, expiry: string, path: string = '') {
    let expires:string = `expires=${expiry}`;
    let cpath:string = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  loginUser(event: SubmitEvent) {
    event.preventDefault()
    const target = event.target as Element
    const user: string = (<HTMLInputElement>target.querySelector('#user')).value
    const pass: string = (<HTMLInputElement>target.querySelector('#pass')).value
    const remember: string = (<HTMLButtonElement>target.querySelector('#remember-me')).value

    this.Auth.getUserInfo(user, pass, remember).subscribe(( obj ) => {
      const data = obj as LoginResponseOptions
      this.Auth.setAuthenticated(data.authenticated)
      this.Auth.setFirstName(data.userData?.firstName)
      this.Auth.setLastName(data.userData?.lastName)
      if ( data.authenticated ) {
        if ( data.authToken )
          this.setCookie('authToken', data.authToken.value, data.authToken.expires, '/')
        this.router.navigate(['/home'])
      } else {
        // TODO do this in validationwindow.alert('Username or password invalid')
      }
      })
  }

}
