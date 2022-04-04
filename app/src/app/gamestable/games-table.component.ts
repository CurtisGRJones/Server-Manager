import { Component, OnInit } from '@angular/core';
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

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any[]>(
      '/api/games'
    ).subscribe( resp => {
      this.games = resp.map( game => {
        return {
          name: game.name,
          addedBy: game.added_by,
          imagePath: game.image_path,
        }
      } )
      this.gamesPopulated = true
    } )
  }

}
