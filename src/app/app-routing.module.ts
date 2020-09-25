import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { SistemaComponent, LoginComponent } from './shared';

const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
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
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
