import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsuariosComponent, BusquedaAvanzadaComponent, DatosPersonaComponent } from './componentes';
import { GestorUsuarioComponent } from './gestor-usuario';
import { DatosUsuarioComponent } from './componentes/form/datos-usuario.component';


@NgModule({
  declarations: [AdminComponent, UsuariosComponent, BusquedaAvanzadaComponent, GestorUsuarioComponent, DatosPersonaComponent, DatosUsuarioComponent],
  imports: [
    NgbModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
