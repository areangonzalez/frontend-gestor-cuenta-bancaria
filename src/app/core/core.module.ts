import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilService, JwtService, ApiService, AutenticacionService, PersonaService, SubSucursalService, EstadoCivilService, GeneroService, NacionalidadService, LocalidadService, SexoService, TipoDocumentoService } from "./services";

@NgModule({
  declarations: [
    UtilService, JwtService, ApiService, AutenticacionService, PersonaService, SubSucursalService, EstadoCivilService, GeneroService, NacionalidadService, LocalidadService, SexoService, TipoDocumentoService
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
