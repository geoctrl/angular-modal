import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { ModalModule } from '../../src/modal.module';

import { AppComponent } from './app.component';
import './sass/main.scss';


import { TestModalComponent } from "./test-modal/test-modal.component";

@NgModule({
  imports: [
    BrowserModule,
    ModalModule
  ],
  declarations: [
    AppComponent,
    TestModalComponent
  ],
  entryComponents: [
    TestModalComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export default class AppModule { }