import { Component, OnInit } from '@angular/core';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  currentUser: any;
  users = [];

  constructor() { }

  ngOnInit(): void {
  }
}
