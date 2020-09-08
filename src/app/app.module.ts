import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from "@angular/common";
import es from "@angular/common/locales/es";

import { NgbModule, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, NgbDateARParserFormatter, FakeBackendInterceptor } from './core/helpers';

import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './core/helpers';

import { AppComponent } from './app.component';
import { SharedModule, SistemaComponent, LoginComponent } from './shared';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    SistemaComponent, LoginComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: NgbDateARParserFormatter },
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // fake-backend
    FakeBackendInterceptor
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
