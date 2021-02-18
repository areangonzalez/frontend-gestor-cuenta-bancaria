import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsuariosComponent, BusquedaAvanzadaComponent, DatosPersonaComponent, DatosUsuarioComponent } from './componentes';
import { GestorUsuarioComponent } from './gestor-usuario';


@NgModule({
  declarations: [AdminComponent, UsuariosComponent, BusquedaAvanzadaComponent, GestorUsuarioComponent, DatosPersonaComponent, DatosUsuarioComponent],
  imports: [
    NgbModule,
    SharedModule,
    AdminRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
