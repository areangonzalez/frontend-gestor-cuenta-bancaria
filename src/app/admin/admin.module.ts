import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../shared";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsuariosComponent, BusquedaAvanzadaComponent } from './componentes';


@NgModule({
  declarations: [AdminComponent, UsuariosComponent, BusquedaAvanzadaComponent],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
