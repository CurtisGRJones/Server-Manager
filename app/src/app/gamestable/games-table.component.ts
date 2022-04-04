import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

type Game = {
  name: string,
  addedBy: string,
  imagePath?: string,
}

@Component({
  selector: 'app-gamestable',
  templateUrl: './games-table.component.html',
  styleUrls: ['./games-table.component.css']
})
export class GamesTableComponent implements OnInit {

  games: Game[] = []
  gamesPopulated = false

  @Input()
  userFilter: string | undefined;
  @Input()
  nameFilter: string | undefined


  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if ( this.nameFilter == 'undefined' ) {
      this.nameFilter = undefined
    }

    if ( this.userFilter == 'undefined' ) {
      this.userFilter = undefined
    }

    if ( this.userFilter || this.nameFilter ) {
      // TODO filter params for sqlinjection
      this.http.post<any[]>(
        '/api/games',
        {
          user: this.userFilter,
          game: this.nameFilter
        }
      ).subscribe(resp => {
        this.games = resp.map(game => {
          return {
            name: game.name,
            addedBy: game.username,
            imagePath: game.image_path,
          }
        })
        this.gamesPopulated = true
      })
    } else {
      this.http.get<any[]>(
        '/api/games'
      ).subscribe(resp => {
        this.games = resp.map(game => {
          return {
            name: game.name,
            addedBy: game.username,
            imagePath: game.image_path,
          }
        })
        this.gamesPopulated = true
      })
    }

    console.log( 'filters' )
    console.log(this.userFilter)
    console.log(this.nameFilter)
  }

}
