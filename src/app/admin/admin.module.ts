import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from "../shared";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { GestorUsuarioComponent } from './gestor-usuario';
import {
  UsuariosComponent, BusquedaAvanzadaComponent, DatosPersonaComponent, DatosUsuarioComponent,
  AgregarUsuarioModalContent, AgregarUsuarioModalComponent, ConfiguracionTabComponent,
  ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent, UsuarioInfoComponent,
  AdministrarRolPermisoComponent, UsuarioPermisoListaComponent, BajaUsuarioModalContent, BajaUsuarioModalComponent,
  AltaUsuarioModalContent, AltaUsuarioModalComponent
} from './componentes';

@NgModule({
  declarations: [
    AdminComponent, UsuariosComponent, BusquedaAvanzadaComponent, GestorUsuarioComponent, DatosPersonaComponent, DatosUsuarioComponent,
    AgregarUsuarioModalContent, AgregarUsuarioModalComponent, ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent, ConfiguracionTabComponent, UsuarioInfoComponent, AdministrarRolPermisoComponent, UsuarioPermisoListaComponent,
    BajaUsuarioModalContent, BajaUsuarioModalComponent, AltaUsuarioModalContent, AltaUsuarioModalComponent
  ],
  imports: [
    NgbModule,
    NgSelectModule,
    SharedModule,
    AdminRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule { }
