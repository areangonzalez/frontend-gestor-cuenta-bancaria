import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from "../shared";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { GestorUsuarioComponent } from './gestor-usuario';
import { GestorLocalidadComponent } from './gestor-localidad';
import {
  UsuariosComponent, BusquedaAvanzadaComponent, DatosPersonaComponent, DatosUsuarioComponent,
  AgregarUsuarioModalContent, AgregarUsuarioModalComponent, ConfiguracionTabComponent,
  ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent, UsuarioInfoComponent,
  AdministrarRolPermisoComponent, UsuarioPermisoListaComponent, BajaUsuarioModalContent, BajaUsuarioModalComponent,
  AltaUsuarioModalContent, AltaUsuarioModalComponent, BorrarPermisoUsuarioModalContent, BorrarPermisoUsuarioModalComponent,
  LocalidadListaComponent, RegistrarLocalidadContent, RegistrarLocalidadComponent
} from './componentes';
import { LocalidadFormComponent } from './componentes/form/localidad-form.component';
import { LocalidadExtraListaComponent } from './componentes/lista/localidad-extra-lista.component';
import { BorrarLocalidadExtraComponent } from './componentes/modal/borrar-localidad-extra.component';

@NgModule({
  declarations: [
    AdminComponent, UsuariosComponent, BusquedaAvanzadaComponent, GestorUsuarioComponent, DatosPersonaComponent, DatosUsuarioComponent,
    AgregarUsuarioModalContent, AgregarUsuarioModalComponent, ConfigurarUsuarioModalContent, ConfigurarUsuarioModalComponent, ConfiguracionTabComponent, UsuarioInfoComponent, AdministrarRolPermisoComponent, UsuarioPermisoListaComponent,
    BajaUsuarioModalContent, BajaUsuarioModalComponent, AltaUsuarioModalContent, AltaUsuarioModalComponent, BorrarPermisoUsuarioModalContent, BorrarPermisoUsuarioModalComponent, LocalidadListaComponent, GestorLocalidadComponent,
    GestorLocalidadComponent, RegistrarLocalidadContent, RegistrarLocalidadComponent, LocalidadFormComponent, LocalidadExtraListaComponent, BorrarLocalidadExtraComponent
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
