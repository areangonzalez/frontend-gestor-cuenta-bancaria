import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { CuentaComponent } from './cuenta.component';



@NgModule({
  declarations: [
    CuentaComponent
  ],
  imports: [
    CommonModule, SharedModule
  ]
})
export class CuentaModule { }
