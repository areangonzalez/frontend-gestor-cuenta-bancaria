import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './core/guards/auth.guard';
import { SistemaComponent, LoginComponent } from './shared';

const routes: Routes = [
  {
    path: '',
    component: SistemaComponent,
    children: [
      {
        path: 'personas',
        canActivate: [AuthGuard],
        loadChildren: () => import('./persona/persona.module').then(m => m.PersonaModule)
      },
      {
        path: 'cuentas',
        canActivate: [AuthGuard],
        loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule)
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { path: '**', redirectTo: 'personas', pathMatch: 'full' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
