import { Component, OnInit } from '@angular/core';
import {UserService} from "@app/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private user: UserService, private router: Router ) { }

  ngOnInit(): void {
    this.user.logout().subscribe( resp => {
      if (resp.success) {
        window.location.reload()
      }
    })
  }

}
