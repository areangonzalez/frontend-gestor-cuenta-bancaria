import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { CuentaComponent } from './cuenta.component';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { MenuComponent, AltaCuentaPersonaComponent, ImportacionCbuComponent } from './menu';
import { ListadoPersonaSelecionadaComponent } from './menu/listado/listado-persona-selecionada.component';



@NgModule({
  declarations: [
    CuentaComponent,
    MenuComponent,
    AltaCuentaPersonaComponent,
    ImportacionCbuComponent,
    ListadoPersonaSelecionadaComponent,
  ],
  imports: [
    CommonModule, SharedModule, CuentaRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CuentaModule { }
