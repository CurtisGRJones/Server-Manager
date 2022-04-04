import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from '@app/home'
import {RegistrationSubmittedComponent} from "@app/registeration-submitted";
import {Err500Component} from "@app/err500";
import {LoginComponent} from "@app/login";
import {RegisterComponent} from "@app/register";
import {ServerlistComponent} from "@app/serverlist";
import {AdminComponent} from "@app/admin";
import {AdminAuthGuard} from "@app/admin-auth.guard";
import {LogoutComponent} from "@app/logout";
import {ServersComponent} from "@app/servers/servers.component";
import {GamesComponent} from "@app/games/games.component";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "logout",
    component: LogoutComponent,
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "registrationRequested",
    component: RegistrationSubmittedComponent
  },
  {
    path: "games",
    component: GamesComponent,
  },
  {
    path: "servers",
    component: ServersComponent,
    canActivate: [AdminAuthGuard],
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
  },
  {
    path: "servers",
    component: ServerlistComponent,
  },
  {
    path: "500",
    component: Err500Component
  },
  {
    path: "**",
    redirectTo: 'home',
  },
]

@NgModule( {
  imports: [RouterModule.forRoot( routes )],
  exports: [RouterModule]
} )
export class AppRoutingModule { }
