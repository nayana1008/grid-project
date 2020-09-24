import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule} from 'ag-grid-angular';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { PreviewComponentComponent } from './preview-component/preview-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PreviewComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
   AgGridModule.withComponents([]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
