import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-err500',
  templateUrl: './err500.component.html',
  styleUrls: ['./err500.component.css']
})
export class Err500Component implements OnInit {

  helpEmail = 'bob@placeholderEmail.ca'

  constructor() { }

  ngOnInit(): void {
  }

}
