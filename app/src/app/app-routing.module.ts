import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from '@app/home'
// TODO shorten these
import {RegistrationSubmittedComponent} from "./registeration-submitted/registration-submitted.component";
import {Err500Component} from "./err500/err500.component";
import {LoginComponent} from "@app/login/login.component";
import {RegisterComponent} from "@app/register/register.component";

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
