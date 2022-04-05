import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

type Request = {
  username: string,
  firstName: string
  lastName: string,
  email: string,
  date: Date,
}

@Component({
  selector: 'app-registration-requests',
  templateUrl: './registration-requests.component.html',
  styleUrls: ['./registration-requests.component.css']
})
export class RegistrationRequestsComponent implements OnInit{

  requests: Request[] = [{
    username: 'bobbyBoy6969',
    firstName: 'Bob',
    lastName: 'Burger',
    email: 'bob@BobsBurgers.ca',
    date: new Date(),
  }]

  constructor( private http: HttpClient) {}

  ngOnInit() {
  }

}
