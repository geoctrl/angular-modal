import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import AppComponent from './app.component';
import './sass/main.scss';



@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export default class AppModule { }