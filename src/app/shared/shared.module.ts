import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CabeceraComponent, LoginComponent, SistemaComponent } from './layout';




@NgModule({
  declarations: [
    CabeceraComponent,
    LoginComponent,
    SistemaComponent
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
