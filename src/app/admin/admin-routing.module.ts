import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { GestorUsuarioComponent } from './gestor-usuario';
import { GestorLocalidadComponent } from './gestor-localidad';
import { LocalidadService, UsuarioService, PermisosService, RolService, ProvinciaService, BackendLocalidadService, LocalidadExtraService, ConvenioService } from '../core/services';


const routes: Routes = [
  { path: '', redirectTo: 'gestor-usuarios', pathMatch: 'full' },
  {
    path: '', component: AdminComponent,
    data: { loading: true, preload: true, breadcrumb: 'Administración', title: 'Administración', rol: ['soporte', 'admin'] },
  },{
    path: 'gestor-usuarios', component: GestorUsuarioComponent,
    data: { loading: true, title: 'Gestión de Usuarios', rol: ['soporte', 'admin'] },
    resolve: { usuarios: UsuarioService, roles: RolService, localidades: LocalidadService, permisos: PermisosService, convenios: ConvenioService}
  },{
    path: 'localidad-abm', component: GestorLocalidadComponent,
    data: { loading: true, title: 'Gestionar Localidades', rol: ['soporte', 'admin'] },
    resolve: { provincias: ProvinciaService, backendLocalidades: BackendLocalidadService, localidadesExtras: LocalidadExtraService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [LocalidadService, ProvinciaService, UsuarioService, PermisosService, RolService, BackendLocalidadService, LocalidadExtraService, ConvenioService]
})
export class AdminRoutingModule { }
