import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { CuentaComponent } from './cuenta.component';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { MenuComponent } from './menu';



@NgModule({
  declarations: [
    CuentaComponent,
    MenuComponent
  ],
  imports: [
    CommonModule, SharedModule, CuentaRoutingModule
  ]
})
export class CuentaModule { }
