import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

type Server = {
  game: string,
  ip: string,
  active: boolean,
  addedBy: string,
  id: string,
}

@Component({
  selector: 'app-serverlist',
  templateUrl: './serverlist.component.html',
  styleUrls: ['./serverlist.component.css']
})
export class ServerlistComponent implements OnInit {

  servers: Server[] = []
  serversPopulated: true | undefined

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get<any[]>(
      '/api/servers'
    ).subscribe(resp => {
      this.servers = resp.map(server => {
        return {
          game: server.game,
          ip: server.ip,
          active: server.active,
          addedBy: server.added_by,
          id: server.id,
        }
      })
      this.serversPopulated = true
    })
  }

  startServer(id: string): void {
    console.log(`Starting server ID: ${id}`)
  }

  stopServer(id: string): void {
    console.log(`Stopping server ID: ${id}`)
  }

}
