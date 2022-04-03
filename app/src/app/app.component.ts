import { Component } from '@angular/core'
import { Router } from '@angular/router';

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )
export class AppComponent {
  title = 'Game Server Manager';
  date = new Date()

  // TODO implement this
  currentUser: any;

  constructor(
    private router: Router,
  ) { }

  logout() {
  }
}
