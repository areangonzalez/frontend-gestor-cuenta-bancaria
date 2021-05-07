import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';

import { HistorialExportacionRoutingModule } from './historial-exportacion-routing.module';
import { HistorialExportacionComponent } from './historial-exportacion.component';
import { HistorialListadoComponent } from './lista/historial-listado.component';

@NgModule({
  declarations: [HistorialExportacionComponent, HistorialListadoComponent],
  imports: [
    CommonModule,
    SharedModule,
    HistorialExportacionRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HistorialExportacionModule { }
