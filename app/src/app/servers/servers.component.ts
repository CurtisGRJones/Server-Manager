import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  gameSearch: string | undefined
  usersSearch: string | undefined
  ipSearch: string | undefined
  activeSearch: string | boolean | undefined
  allUsers: string[] = []


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let activeSearch = ''
    this.route.queryParams.subscribe( params => {
      this.gameSearch = decodeURIComponent(params['game'])
      this.ipSearch = decodeURIComponent(params['ip'])
      this.usersSearch = decodeURIComponent(params['user'])
      this.activeSearch = params['active']
    } )

    this.parseActiveSearch()

    console.log(this.gameSearch)

    this.http.get<string[]>("/api/serverUsers").subscribe( resp =>
      this.allUsers = resp
    )
  }

  parseActiveSearch() {
    if ( this.activeSearch == 'undefined' ) {
      this.activeSearch = undefined
    } else if ( this.activeSearch != undefined ) {
      this.activeSearch = this.activeSearch == 'true'
    }
  }

  updateTable( event: SubmitEvent ): void{
    event.preventDefault()
    const target = event.target as Element
    this.usersSearch = (<HTMLInputElement>target.querySelector('#user'))?.value || ''
    this.gameSearch = (<HTMLInputElement>target.querySelector('#game'))?.value || ''
    this.ipSearch = (<HTMLInputElement>target.querySelector('#ip'))?.value || ''
    this.activeSearch = (<HTMLInputElement>target.querySelector('#active'))?.value

    this.parseActiveSearch()

    this.router.navigate(
      [window.location.pathname],
      {
        queryParams: {
          user: this.usersSearch,
          game: this.gameSearch,
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
