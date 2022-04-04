import { Component, OnInit } from '@angular/core';
import {UserService} from "@app/user.service";

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
  authenticated: boolean | undefined

  constructor(
    private user: UserService,
  ) {
    this.user.isUserAuthenticated.subscribe( result => {
      this.authenticated = result;
    });
  }

  ngOnInit() {
    this.user.isAuthenticated.subscribe( result => {
      this.user.isUserAuthenticated.next(result);
    })
  }
}
