import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './core/guards/auth.guard';
import { SistemaComponent, LoginComponent, DashboardComponent } from './shared';

const routes: Routes = [
  {
    path: '',
    component: SistemaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'tesoreria',
        data: { breadcrumb: 'Tesorería', title: 'Tesorería', rol: ['usuario', 'admin'] },
        loadChildren: () => import('./persona/persona.module').then(m => m.PersonaModule)
      },
      {
        path: 'cuentas',
        data: { breadcrumb: 'Cuentas', title: 'Cuentas', rol: ['usuario', 'admin'] },
        loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule)
      },
      { path: '', redirectTo: 'tesoreria', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    data: { title: 'Administracíon', rol: ['soporte', 'admin'] },
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Iniciar Sesión' },
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
