import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  nameSearch: string | undefined
  usersSearch: string | undefined
  allUsers: string[] = []


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {
      this.nameSearch = decodeURIComponent(params['name'])
      this.usersSearch = params['user'] != 'none' ? decodeURIComponent(params['user']) : undefined
    } )

    this.http.get<string[]>("/api/gameUsers").subscribe( resp =>
      this.allUsers = resp
    )
  }

  updateTable( event: SubmitEvent ): void{
    event.preventDefault()
    const target = event.target as Element
    this.usersSearch = (<HTMLInputElement>target.querySelector('#user')).value
    this.nameSearch = (<HTMLInputElement>target.querySelector('#name')).value

    this.router.navigate(
      [window.location.pathname],
      {
        queryParams: {
          user: this.usersSearch,
          name: this.nameSearch
        },
        queryParamsHandling: 'merge'
      }
    ).then ( () => {
      window.location.reload();
    })
  }

}
