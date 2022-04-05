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

  requests: Request[] = []
  requestsPopulated: boolean | undefined

  constructor( private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>(
      '/api/registrationRequests'
    ).subscribe(resp => {
      this.requests = resp.map(request => {
        return {
          username: request.username,
          firstName: request.first_name,
          lastName: request.last_name,
          email: request.email,
          date: new Date(request.created_on)
        }
      })
      this.requestsPopulated = this.requests.length > 0
    })
  }

}
