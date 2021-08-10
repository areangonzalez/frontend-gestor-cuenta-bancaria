import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from "@angular/common";
import es from "@angular/common/locales/es";

import { RadarSpinnerModule } from "angular-epic-spinners";

// import { fakeBackendProvider } from "./core/helpers";

import { NgbModule, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, NgbDateARParserFormatter } from './core/helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule, BreadcrumbComponent, LoaderComponent, NotificacionComponent, DashboardComponent, SistemaComponent, LoginComponent } from './shared';

import { JwtInterceptor, ErrorInterceptor } from './core/helpers';
import { BreadcrumbsService } from './core/services';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent, DashboardComponent, SistemaComponent,
    NotificacionComponent, BreadcrumbComponent, LoginComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpClientModule,
    RadarSpinnerModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'es-AR' },
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: NgbDateARParserFormatter },
    Title,
    BreadcrumbsService,
    // fake-backend
    // fakeBackendProvider
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
