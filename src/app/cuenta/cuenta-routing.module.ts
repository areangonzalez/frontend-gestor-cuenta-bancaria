import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CuentaComponent } from './cuenta.component';
import { AltaCuentaPersonaComponent, ImportacionCbuComponent } from './menu';
import { LocalidadService, PersonaService, SubSucursalService } from '../core/services';
import { AuthGuard } from '../core/guards/auth.guard';

const routes = [
  {
    path: '',
    component: CuentaComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'alta', component: AltaCuentaPersonaComponent,
        data: { title: 'Alta de cuentas' },
        resolve: {
          personas: PersonaService, subSucursales: SubSucursalService
        }
      },
      {
        path: 'importacion', component: ImportacionCbuComponent,
        data: { title: 'Importación de CBU' },
        resolve: {
          localidades: LocalidadService, personas: PersonaService
        }
      },
      { path: '**', redirecTo: 'alta', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonaService, SubSucursalService, LocalidadService]
})
export class CuentaRoutingModule { }
