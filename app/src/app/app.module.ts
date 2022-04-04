import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from '@app/home'
import { RegistrationSubmittedComponent } from '@app/registeration-submitted';
import { LoginMenuComponent } from '@app/login-menu';
import { Err500Component } from '@app/err500'
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {LoginComponent} from "@app/login";
import {RegisterComponent} from "@app/register";
import { ServerlistComponent } from '@app/serverlist';
import { AdminComponent } from '@app/admin';
import { WelcomeMenuComponent } from '@app/welcome-menu';
import { LogoutComponent } from '@app/logout';

@NgModule( {
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RegistrationSubmittedComponent,
    LoginMenuComponent,
    Err500Component,
    ServerlistComponent,
    AdminComponent,
    WelcomeMenuComponent,
    LogoutComponent,
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
