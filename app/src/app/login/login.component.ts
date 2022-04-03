import { Component, OnInit } from '@angular/core'
import {AuthService} from "@app/auth.service";

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
} )
export class LoginComponent implements OnInit {

  validated: boolean = false
  user: string = ""

  constructor( private Auth: AuthService ) {

  }

  ngOnInit(): void {
    console.log( this.validated )
    console.log( this.user )
  }

  // TODO type this
  loginUser(event: SubmitEvent) {
    event.preventDefault()
    const target = event.target as Element
    const user: string = (<HTMLInputElement>target.querySelector('#user')).value
    const pass: string = (<HTMLInputElement>target.querySelector('#pass')).value
    const remember: string = (<HTMLButtonElement>target.querySelector('#remember-me')).value

    this.Auth.getUserInfo(user, pass, remember)
  }

}
