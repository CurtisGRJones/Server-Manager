import { Component, OnInit } from '@angular/core'
import {AuthService} from "@app/auth.service";
import {Router} from "@angular/router";
import {UserService} from "@app/user.service";

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
  username: string = ''

  constructor(
    private Auth: AuthService,
    private user: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  loginUser(event: SubmitEvent) {
    event.preventDefault()
    const target = event.target as Element
    const username: string = (<HTMLInputElement>target.querySelector('#user')).value
    const pass: string = (<HTMLInputElement>target.querySelector('#pass')).value
    const remember: string = (<HTMLButtonElement>target.querySelector('#remember-me')).value

    this.Auth.getUserInfo(username, pass, remember).subscribe(( obj ) => {
      const data = obj as LoginResponseOptions
      if ( data.authenticated ) {
        this.user.isUserAuthenticated.next(true)
        this.router.navigate(['/home'])
      } else {
        // TODO do this in validation
        window.alert('Username or password invalid')
      }
      })
  }

}
