import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { CuentaComponent } from './cuenta.component';
import { CuentaRoutingModule } from './cuenta-routing.module';



@NgModule({
  declarations: [
    CuentaComponent
  ],
  imports: [
    CommonModule, SharedModule, CuentaRoutingModule
  ]
})
export class CuentaModule { }
