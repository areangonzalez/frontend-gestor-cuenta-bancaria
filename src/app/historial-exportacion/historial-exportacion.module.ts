import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialExportacionRoutingModule } from './historial-exportacion-routing.module';
import { HistorialExportacionComponent } from './historial-exportacion.component';
import { HistorialListadoComponent } from './lista/historial-listado.component';


@NgModule({
  declarations: [HistorialExportacionComponent, HistorialListadoComponent],
  imports: [
    CommonModule,
    HistorialExportacionRoutingModule
  ]
})
export class HistorialExportacionModule { }
