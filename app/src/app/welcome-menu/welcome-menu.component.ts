import { Component, OnInit } from '@angular/core';
import {AuthService} from "@app/auth.service";

@Component({
  selector: 'app-welcome-menu',
  templateUrl: './welcome-menu.component.html',
  styleUrls: ['./welcome-menu.component.css']
})
export class WelcomeMenuComponent implements OnInit {

  name: string | undefined

  constructor( private Auth: AuthService ) { }

  ngOnInit(): void {
    this.name = this.Auth.getFullName
  }

}
