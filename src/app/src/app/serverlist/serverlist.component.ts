import {Component, Input, OnInit} from '@angular/core';
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

  @Input()
  userFilter: string | undefined;
  @Input()
  ipFilter: string | undefined
  @Input()
  gameFilter: string | undefined
  @Input()
  activeFilter: string | boolean | undefined

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    if (this.userFilter == 'undefined') {
      this.userFilter = undefined
    }

    if (this.ipFilter == 'undefined') {
      this.ipFilter = undefined
    }

    if (this.gameFilter == 'undefined') {
      this.gameFilter = undefined
    }

    if (this.activeFilter == 'undefined' || this.activeFilter == '') {
      this.activeFilter = undefined
    } else if (this.activeFilter != undefined){
      this.activeFilter = this.activeFilter == 'true'
    }

    if ( this.userFilter || this.ipFilter || this.gameFilter || this.activeFilter != undefined ) {
      this.http.post<any[]>(
        '/api/servers',
        {
          user: this.userFilter,
          ip: this.ipFilter,
          game: this.gameFilter,
          active: this.activeFilter
        }
      ).subscribe(resp => {
        this.servers = resp.map(server => {
          return {
            game: server.game,
            ip: server.ip,
            active: server.active,
            addedBy: server.username,
            id: server.id,
          }
        })
        this.serversPopulated = true
      })
    } else {
      this.http.get<any[]>(
        '/api/servers'
      ).subscribe(resp => {
        this.servers = resp.map(server => {
          return {
            game: server.game,
            ip: server.ip,
            active: server.active,
            addedBy: server.username,
            id: server.id,
          }
        })
        this.serversPopulated = true
      })
    }
  }

  startServer(server: Server): void {
    console.log(`Starting server ID: ${server.id}`)
    this.http.post<{ success: boolean }>( '/api/servers/start',
      {
        id: server.id
      }
    ).subscribe( resp => {
      if ( resp.success ) {
        server.active = true
      }
    })
  }

  stopServer(server: Server): void {
    console.log(`Stopping server ID: ${server.id}`)
    this.http.post<{ success: boolean }>( '/api/servers/stop',
      {
        id: server.id
      }
    ).subscribe( resp  => {
      if ( resp.success ) {
        server.active = false
      }
    })
  }

}
