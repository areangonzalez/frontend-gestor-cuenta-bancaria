import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialExportacionRoutingModule } from './historial-exportacion-routing.module';
import { HistorialExportacionComponent } from './historial-exportacion.component';


@NgModule({
  declarations: [HistorialExportacionComponent],
  imports: [
    CommonModule,
    HistorialExportacionRoutingModule
  ]
})
export class HistorialExportacionModule { }
