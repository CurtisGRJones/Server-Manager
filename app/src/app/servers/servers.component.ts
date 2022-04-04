import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  nameSearch: string | undefined
  usersSearch: string | undefined
  ipSearch: string | undefined
  allUsers: string[] = []


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.nameSearch = decodeURIComponent(params['name'])
      this.ipSearch = decodeURIComponent(params['ip'])
      this.usersSearch = params['user'] != 'none' ? decodeURIComponent(params['user']) : undefined
    } )

    this.http.get<string[]>("/api/severUsers").subscribe( resp =>
      this.allUsers = resp
    )
  }

  updateTable( event: SubmitEvent ): void{
    event.preventDefault()
    const target = event.target as Element
    this.usersSearch = (<HTMLInputElement>target.querySelector('#user')).value
    this.nameSearch = (<HTMLInputElement>target.querySelector('#game')).value
    this.nameSearch = (<HTMLInputElement>target.querySelector('#ip')).value

    this.router.navigate(
      [window.location.pathname],
      {
        queryParams: {
          user: this.usersSearch,
          name: this.nameSearch,
          ip: this.ipSearch
        },
        queryParamsHandling: 'merge'
      }
    ).then ( () => {
      window.location.reload();
    })
  }

}
