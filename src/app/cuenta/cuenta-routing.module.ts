import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CuentaComponent } from './cuenta.component';
import { AltaCuentaPersonaComponent, ImportacionCbuComponent } from './menu';
import { PersonaService, SubSucursalService } from '../core/services';

const routes = [
  {
    path: '',
    component: CuentaComponent,
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
        data: { title: 'Importación de CBU' }
      },
      { path: '**', redirecTo: 'alta', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PersonaService, SubSucursalService]
})
export class CuentaRoutingModule { }
