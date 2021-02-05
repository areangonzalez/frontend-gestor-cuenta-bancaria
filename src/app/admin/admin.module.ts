import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsuariosComponent, BusquedaAvanzadaComponent } from './componentes';
import { GestorUsuarioComponent } from './gestor-usuario';


@NgModule({
  declarations: [AdminComponent, UsuariosComponent, BusquedaAvanzadaComponent, GestorUsuarioComponent],
  imports: [
    NgbModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
