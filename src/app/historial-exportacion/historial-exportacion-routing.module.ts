import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { HistorialExportacionComponent } from './historial-exportacion.component';


const routes = [
  {
    path: '',
    component: HistorialExportacionComponent,
    canActivateChild: [AuthGuard],
    /* resolve: {
      historial: HistorialExportacionService
    }, */
    data: { rol: ['usuario', 'admin'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialExportacionRoutingModule { }
