import { Component, OnInit } from '@angular/core';
import {UserService} from "@app/user.service";

@Component({
  selector: 'app-welcome-menu',
  templateUrl: './welcome-menu.component.html',
  styleUrls: ['./welcome-menu.component.css']
})
export class WelcomeMenuComponent implements OnInit {

  firstName: string | undefined
  lastName: string | undefined
  name: string | undefined

  constructor( private user: UserService ) { }

  ngOnInit(): void {
      this.user.getUserData().subscribe( resp => {
        this.firstName = resp.firstName
        this.lastName = resp.lastName
        this.name = `${this.firstName} ${this.lastName}`
      } )
  }

}
