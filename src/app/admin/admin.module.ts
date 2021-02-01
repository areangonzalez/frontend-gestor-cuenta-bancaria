import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsuariosComponent, BusquedaAvanzadaComponent } from './componentes';
import { GestorUsuarioComponent } from './gestor-usuario';


@NgModule({
  declarations: [AdminComponent, UsuariosComponent, BusquedaAvanzadaComponent, GestorUsuarioComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
