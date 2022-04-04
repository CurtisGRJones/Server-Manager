import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {

  nameSearch: string | undefined
  usersSearch: string | undefined
  allUsers: string[] = ['test1', "test2"]

  constructor() { }

  ngOnInit(): void {
  }

}
