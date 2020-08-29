import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SistemaComponent, LoginComponent } from './shared';

const routes: Routes = [
  {
    path: '',
    component: SistemaComponent,
    children: [
      {
        path: 'personas',
        loadChildren: () => import('./persona/persona.module').then(m => m.PersonaModule)
      },
      {
        path: 'cuentas',
        loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { path: '**', redirectTo: 'personas', pathMatch: 'full' }
];
    /* {
      path: 'login',
      loadChildren: () => import('nombre-path').then(m => m.NombreModulo)
    } */


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
