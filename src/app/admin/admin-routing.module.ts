import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { GestorUsuarioComponent } from './gestor-usuario';
import { LocalidadService, UsuarioService, PermisosService, RolService } from '../core/services';


const routes: Routes = [
  { path: '', redirectTo: 'gestor-usuarios', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    data: { loading: true, preload: true, breadcrumb: 'Administración', title: 'Administración', rol: ['soporte', 'admin'] },
  },{
    path: 'gestor-usuarios', component: GestorUsuarioComponent,
    data: { loading: true, title: 'Gestión de Usuarios', rol: ['soporte', 'admin'] },
    resolve: { usuarios: UsuarioService, permisos: PermisosService, roles: RolService, localidades: LocalidadService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LocalidadService]
})
export class AdminRoutingModule { }