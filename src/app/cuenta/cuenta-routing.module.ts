import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CuentaComponent } from './cuenta.component';
import { AltaCuentaPersonaComponent, ImportacionCbuComponent } from './menu';

const routes = [
  {
    path: '',
    component: CuentaComponent,
    children: [
      { path: '', redirecTo: 'alta', pathMatch: 'full' },
      {
        path: 'alta', component: AltaCuentaPersonaComponent,
        data: { title: 'Alta de cuentas' }
      },
      {
        path: 'importacion', component: ImportacionCbuComponent,
        data: { title: 'Importación de CBU' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuentaRoutingModule { }
