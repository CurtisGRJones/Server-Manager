import { Component, OnInit } from '@angular/core';
import {UserService} from "@app/user.service";

@Component({
  selector: 'app-top-corner-menu',
  templateUrl: './top-corner-menu.component.html',
  styleUrls: ['./top-corner-menu.component.css']
})
export class TopCornerMenuComponent implements OnInit {

  authenticated: boolean | undefined

  constructor(
    private user: UserService,
  ) {
    this.user.isUserAuthenticated.subscribe( result => {
      this.authenticated = result;
    });
  }

  ngOnInit() {
    this.user.isAuthenticated(false).subscribe( result => {
      this.user.isUserAuthenticated.next(result);
    })
  }

}
