import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from '@app/home'
import { RegistrationSubmittedComponent } from './registeration-submitted/registration-submitted.component';
import { LoginMenuComponent } from './login-menu/login-menu.component';
import { Err500Component } from './err500/err500.component'
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "@app/login/login.component";
import {RegisterComponent} from "@app/register/register.component";

@NgModule( {
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegistrationSubmittedComponent,
    LoginMenuComponent,
    Err500Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
} )
export class AppModule { }
