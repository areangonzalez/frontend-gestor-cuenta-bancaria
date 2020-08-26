import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SistemaComponent } from './layout/sistema/sistema.component';
import { LoginComponent } from './layout/login/login.component';
// import { CabeceraComponent } from './layout';




@NgModule({
  declarations: [
    // CabeceraComponent
  SistemaComponent,
    LoginComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
