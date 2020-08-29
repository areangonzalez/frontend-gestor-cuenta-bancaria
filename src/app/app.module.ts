import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from "@angular/common";
import es from "@angular/common/locales/es";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SharedModule, SistemaComponent, LoginComponent } from './shared';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    SistemaComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FontAwesomeModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-AR' }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
