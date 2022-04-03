import {Component, OnInit} from '@angular/core'
import {AuthService} from "@app/auth.service";

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit{
  title = 'Game Server Manager';
  date = new Date()

  authenticated: boolean | undefined

  constructor(private Auth: AuthService) { }

  ngOnInit() {
    this.authenticated = this.Auth.getAuthenticated
  }
}
