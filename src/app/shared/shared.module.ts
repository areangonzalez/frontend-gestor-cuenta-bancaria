import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CabeceraComponent } from './layout';

@NgModule({
  declarations: [
    CabeceraComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    CabeceraComponent
  ]
})
export class SharedModule { }
