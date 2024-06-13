import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule}  from '@angular/common/http'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { AddPlayerComponent } from './add-player/add-player.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewAllComponent } from './view-all/view-all.component';
import { SearchComponent } from './search/search.component';
import { UpdateComponent } from './update/update.component';
import { SortedComponent } from './sorted/sorted.component';



@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    AddPlayerComponent,
    DashboardComponent,
    ViewAllComponent,
   
    SearchComponent,
         UpdateComponent,
         SortedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
