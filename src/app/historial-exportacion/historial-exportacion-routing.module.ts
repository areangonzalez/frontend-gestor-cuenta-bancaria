import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { ConvenioService, ExportService } from '../core/services';
import { HistorialExportacionComponent } from './historial-exportacion.component';


const routes = [
  {
    path: '',
    component: HistorialExportacionComponent,
    canActivateChild: [AuthGuard],
    resolve: {
      historial: ExportService, convenios: ConvenioService
    },
    data: { title: 'Historial de exportación', rol: ['usuario','usuario_8180','usuario_8277','admin'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialExportacionRoutingModule { }
