import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from "@angular/router";

@Component( {
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
} )
export class LoginComponent implements OnInit {

  validated: boolean = false
  user: string = ""

  constructor( private route: ActivatedRoute ) {

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.validated = params['validated'];
      this.user = params['user']
    });
    console.log( this.validated )
    console.log( this.user )
  }

}
