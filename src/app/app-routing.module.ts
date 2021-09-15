import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './core/guards/auth.guard';
import { SistemaComponent, LoginComponent, DashboardComponent } from './shared';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: SistemaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cuentas',
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Cuentas', title: 'Cuentas', rol: ['usuario','usuario_8180','usuario_8277','admin'] },
        loadChildren: () => import('./cuenta/cuenta.module').then(m => m.CuentaModule)
      },
      {
        path: 'historial-exportacion',
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Historial de exportación', title: 'Historial de Exportación', rol: ['usuario','usuario_8180','usuario_8277','admin'] },
        loadChildren: () => import('./historial-exportacion/historial-exportacion.module').then(m => m.HistorialExportacionModule)
      },
      { path: '', redirectTo: 'cuentas', pathMatch: 'full' }
    ]
  },
  {
    path: 'admin',
    component: DashboardComponent,
    canActivate: [AuthGuard],
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
