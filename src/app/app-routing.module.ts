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
        data: { breadcrumb: 'Tesorería', title: 'Tesorería' },
        loadChildren: () => import('./persona/persona.module').then(m => m.PersonaModule)
      },
      {
        path: 'cuentas',
        data: { breadcrumb: 'Cuentas', title: 'Cuentas' },
        loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule)
      },
      { path: '', redirectTo: 'tesoreria', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
