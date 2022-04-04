import { Component, OnInit } from '@angular/core';
import {UserService} from "@app/user.service";

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  authenticated: boolean = false

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
