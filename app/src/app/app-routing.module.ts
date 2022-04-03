import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from '@app/home'
// TODO shorten these
import {RegistrationSubmittedComponent} from "@app/registeration-submitted";
import {Err500Component} from "@app/err500";
import {LoginComponent} from "@app/login";
import {RegisterComponent} from "@app/register";

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
    path: "register",
    component: RegisterComponent
  },
  {
    path: "registrationRequested",
    component: RegistrationSubmittedComponent
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
