import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MediatorComponent } from './components/mediator/mediator.component';
import { Worker1Component } from './components/worker1/worker1.component';
import { Worker2Component } from './components/worker2/worker2.component';

@NgModule({
  declarations: [
    AppComponent,
    MediatorComponent,
    Worker1Component,
    Worker2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
