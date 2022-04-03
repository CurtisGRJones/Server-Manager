import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registeration-submitted',
  templateUrl: './registration-submitted.component.html',
  styleUrls: ['./registration-submitted.component.css']
})
export class RegistrationSubmittedComponent implements OnInit {

  email = "bob@placeholderEmail.ca"

  constructor() { }

  ngOnInit(): void {
  }

}
