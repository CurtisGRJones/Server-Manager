import {Component, OnInit} from '@angular/core'
import {AuthService} from "@app/auth.service";
import {Observable} from "rxjs";
import {AdminAuthGuard} from "@app/admin-auth.guard";

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit{
  title = 'Game Server Manager';
  date = new Date()

  authenticated: true | Observable<boolean> | Promise<boolean> | undefined

  constructor(private authGuard: AdminAuthGuard) { }

  ngOnInit() {
    this.authenticated = this.authGuard.isAuthenticated
  }
}
