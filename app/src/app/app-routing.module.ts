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
    path: "admin",
    component: AdminComponent,
    canActivate: [AdminAuthGuard],
    canActivateChild: [AdminAuthGuard],
  },
  {
    path: "serverList",
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
