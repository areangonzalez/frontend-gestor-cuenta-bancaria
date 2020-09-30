import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { CuentaComponent } from './cuenta.component';
import { CuentaRoutingModule } from './cuenta-routing.module';
import { MenuComponent, AltaCuentaPersonaComponent, ImportacionCbuComponent, ImportarArchivoContent, ImportarArchivoComponent } from './menu';
import { ListadoPersonaSelecionadaComponent } from './menu/listado/listado-persona-selecionada.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CuentaComponent,
    MenuComponent,
    AltaCuentaPersonaComponent,
    ImportacionCbuComponent,
    ListadoPersonaSelecionadaComponent,
    ImportarArchivoContent, ImportarArchivoComponent
  ],
  imports: [
    CommonModule, SharedModule, CuentaRoutingModule, NgbModalModule
  ],
  exports: [ImportarArchivoContent, ImportarArchivoComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CuentaModule { }
