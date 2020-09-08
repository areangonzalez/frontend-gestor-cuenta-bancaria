import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from "@angular/common";
import es from "@angular/common/locales/es";

import { NgbModule, NgbDatepickerI18n, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n, NgbDateARParserFormatter, FakeBackendInterceptor } from './core/helpers';

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
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n },
    { provide: NgbDateParserFormatter, useClass: NgbDateARParserFormatter },
    { provide: LOCALE_ID, useValue: 'es-AR' },
    // fake-backend
    FakeBackendInterceptor
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
