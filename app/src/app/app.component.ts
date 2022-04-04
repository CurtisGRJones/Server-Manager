import {Component, OnInit} from '@angular/core'
import {AuthService} from "@app/auth.service";
import {Observable} from "rxjs";
import {AdminAuthGuard} from "@app/admin-auth.guard";
import {UserService} from "@app/user.service";

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit{
  title = 'Game Server Manager';
  date = new Date()

  authenticated: boolean | undefined

  constructor(private user: UserService) {

  }

  ngOnInit() {
    this.user.isAuthenticated.subscribe( result => {
      this.authenticated = result
    })
  }
}
