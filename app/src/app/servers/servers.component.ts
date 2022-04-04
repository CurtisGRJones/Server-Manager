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
  activeSearch: boolean | undefined
  allUsers: string[] = []


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let activeSearch = ''
    this.route.queryParams.subscribe( params => {
      this.nameSearch = decodeURIComponent(params['name'])
      this.ipSearch = decodeURIComponent(params['ip'])
      this.usersSearch = decodeURIComponent(params['user'])
      activeSearch = params['active']
    } )

    console.log( activeSearch )

    if ( activeSearch == 'undefined' ) {
      this.activeSearch = undefined
    } else {
      this.activeSearch = activeSearch == 'true'
    }

    console.log(this.nameSearch)

    this.http.get<string[]>("/api/serverUsers").subscribe( resp =>
      this.allUsers = resp
    )
  }

  updateTable( event: SubmitEvent ): void{
    event.preventDefault()
    const target = event.target as Element
    this.usersSearch = (<HTMLInputElement>target.querySelector('#user'))?.value || ''
    this.nameSearch = (<HTMLInputElement>target.querySelector('#game'))?.value || ''
    this.ipSearch = (<HTMLInputElement>target.querySelector('#ip'))?.value || ''
    const activeSearch = (<HTMLInputElement>target.querySelector('#active'))?.value

    if ( activeSearch == 'undefined' ) {
      this.activeSearch = undefined
    } else {
      this.activeSearch = activeSearch == 'true'
    }

    this.router.navigate(
      [window.location.pathname],
      {
        queryParams: {
          user: this.usersSearch,
          name: this.nameSearch,
          ip: this.ipSearch,
          active: this.activeSearch
        },
        queryParamsHandling: 'merge'
      }
    ).then ( () => {
      window.location.reload();
    })
  }

}
